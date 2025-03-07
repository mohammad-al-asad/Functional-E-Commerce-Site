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
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
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
        console.error(error);
        return rejectWithValue(error.message);
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
        console.error(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const toggleIsSelected = createAsyncThunk(
  "cart/toggleIsSelected",
  async (cartId: string, { getState, rejectWithValue }) => {
    const state: any = getState();
    const cartItem = state.cart.cart.find((item: any) => item.$id === cartId);
    if (cartItem) {
      try {
        const {isSelected} = await databases.getDocument(db,cartCollection,cartId)
        const updatedCart = await databases.updateDocument(
          db,
          cartCollection,
          cartId,
          {
            isSelected: !isSelected,
          }
        );
        return updatedCart;
      } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const increaseCounter = createAsyncThunk(
  "cart/increaseCounter",
  async (cartId: string, { getState, rejectWithValue }) => {
    const state: any = getState();
    const cartItem = state.cart.cart.find((item: any) => item.$id === cartId);
    if (cartItem) {
      try {
        const updatedCart = await databases.updateDocument(
          db,
          cartCollection,
          cartId,
          {
            count: cartItem.count + 1,
          }
        );
        return updatedCart;
      } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const decreaseCounter = createAsyncThunk(
  "cart/decreaseCounter",
  async (cartId: string, { getState, rejectWithValue }) => {
    const state: any = getState();
    const cartItem = state.cart.cart.find((item: any) => item.$id === cartId);
    
    if (cartItem) {
      if (cartItem.count > 1) {
        try {
          const updatedCart = await databases.updateDocument(
            db,
            cartCollection,
            cartId,
            {
              count: cartItem.count - 1,
            }
          );
          return cartId;
        } catch (error: any) {
          console.error(error);
          return rejectWithValue(error.message);
        }
      } else {
        try {
          await databases.deleteDocument(db, cartCollection, cartId);
          return cartId;
        } catch (error: any) {
          console.error(error);
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const removeCart = createAsyncThunk(
  "cart/removeCart",
  async (cartId: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(db, cartCollection, cartId);
      return cartId;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      if (action.payload) state.cart = action.payload;
    });
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
    builder.addCase(toggleIsSelected.fulfilled, (state, action) => {
      const index = state.cart.findIndex((item: any) => item.$id === action.payload?.$id);
      if (index > -1) {
        state.cart[index] = action.payload;
      }
    });
    builder.addCase(increaseCounter.fulfilled, (state, action) => {
      const index = state.cart.findIndex((item: any) => item.$id === action.payload?.$id);
      if (index > -1) {
        state.cart[index] = action.payload;
      }
    });
    builder.addCase(decreaseCounter.fulfilled, (state, action) => {
      const index = state.cart.findIndex((item: any) => item.$id === action.payload);
      if (index > -1) {
        if (state.cart[index].count > 1) {
          state.cart[index].count -= 1;
        } else {
          state.cart.splice(index, 1);
        }
      }
    });
    builder.addCase(removeCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((item: any) => item.$id !== action.payload);
    });
  },
});

export const getCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
