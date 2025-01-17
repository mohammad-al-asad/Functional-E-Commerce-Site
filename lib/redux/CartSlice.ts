import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/lib/redux";
import { databases, db } from "../Appwrite";
import { Query } from "appwrite";

const cartCollection = "678133af000887a2b6ef";
interface cartType {
  cart: any[];
}

const initialState: cartType = {
  cart: [],
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: string, thunkApi) => {
    try {
      const { documents } = await databases.listDocuments(db, cartCollection, [
        Query.equal("userId", userId),
      ]);

      return documents;
    } catch (error: any) {
      console.log(error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload: any, { getState, rejectWithValue }) => {
    const state: any = getState();
    const index = state.cart.cart.findIndex((item: any) => {
      return item.product?.$id === payload.product.$id;
    });
    if (index > -1) {
      const cartItem = state.cart.cart[index];
      try {
        const updatedCart = await databases.updateDocument(
          db,
          cartCollection,
          cartItem.$id,
          {
            count: cartItem.count + 1,
          }
        );
        return updatedCart;
      } catch (error: any) {
        console.log(error.message);
        rejectWithValue(error.message);
      }
    } else {
      try {
        const newCart = await databases.createDocument(
          db,
          cartCollection,
          Date.now().toString(),
          {
            product: payload.product.$id,
            userId: payload.userId,
            count: 1,
          }
        );
        return newCart;
      } catch (error: any) {
        console.log(error.message);
        rejectWithValue(error.message);
      }
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseCounter: (state, action) => {
      state.cart.forEach((item: any) => {
        if (action.payload === item.$id) {
          item.count += 1;
          databases
            .updateDocument(db, cartCollection, action.payload, {
              count: item.count,
            })
            .catch(console.log);
        }
      });
    },
    decreaseCounter: (state, action) => {
      state.cart.forEach((item: any) => {
        if (action.payload === item.$id) {
          if (item.count > 1) {
            item.count -= 1;
            databases
              .updateDocument(db, cartCollection, action.payload, {
                count: item.count,
              })
              .catch(console.log);
          } else {
            const index = state.cart.indexOf(item);
            state.cart.splice(index, 1);
            databases
              .deleteDocument(db, cartCollection, action.payload)
              .catch(console.log);
          }
        }
      });
    },

    removeCart: (state, action) => {
      state.cart = state.cart.filter((item: any) => {
        return item.$id !== action.payload;
      });

      databases
        .deleteDocument(db, cartCollection, action.payload)
        .catch(console.log);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const index = state.cart.findIndex(
        (item: any) => item.product?.$id === action.payload?.product.$id
      );

      if (index > -1) {
        state.cart[index] = action.payload;
      } else {
        state.cart.push(action.payload);
      }
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      if (action.payload) state.cart = action.payload;
    });
  },
});

export const { removeCart, increaseCounter, decreaseCounter } =
  cartSlice.actions;
export const getCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
