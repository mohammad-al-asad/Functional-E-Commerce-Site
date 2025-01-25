import { Client, Databases, Account, ID, Avatars, Storage } from "appwrite";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../redux/AuthSlice";
import { fetchCart } from "../redux/CartSlice";
import { AppDispatch, RootState } from "../redux";
import { signUpSchema } from "@/schemas/sign-up";
import { z } from "zod";
import { signinSchema } from "@/schemas/signin";
export const db = "67807181002769121b8d";
export const bucketId = "67939c92002945e72ece";
export const userCollection = "6790fe4a003a031fb5c8";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678070960035ca902a14");

export const account = new Account(client);
const avatar = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default function useAppwrite() {
  const dispatch = useDispatch<AppDispatch>();
  const user: any = useSelector((state: RootState) => state.auth.user);

  async function fetch_User_Cart() {
    try {
      const user = await account.get();
      const {
        avatar,
        avatarId,
        fullname,
        contact,
        division,
        district,
        upazila,
        fullAddress,
      } = await databases.getDocument(db, userCollection, user.$id);
      dispatch(
        setUser({
          ...user,
          avatar,
          avatarId,
          fullname,
          contact,
          division,
          district,
          upazila,
          fullAddress,
        })
      );
      dispatch(fetchCart(user.$id));
    } catch (error: any) {
      console.log(error.message);
      throw Error(error.message);
    }
  }

  async function signout() {
    try {
      await account.deleteSession("current");
      dispatch(clearUser());
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function signin(values: z.infer<typeof signinSchema>) {
    try {
      await account.createEmailPasswordSession(values.email, values.password);
      await fetch_User_Cart();
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function signup(values: z.infer<typeof signUpSchema>) {
    values.phone = "+880" + values.phone;
    try {
      const auth = await account.create(
        ID.unique(),
        values.email,
        values.password,
        values.username
      );

      const userAvatar = avatar.getInitials(auth.name);
      const user = await databases.createDocument(
        db,
        userCollection,
        auth.$id,
        {
          userid: auth.$id,
          avatar: userAvatar,
        }
      );

      await signin({ email: values.email, password: values.password });
      await account.updatePhone(values.phone, values.password);
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function uploadAvatar(avatar: File) {
    try {
      const { $id } = await storage.createFile(bucketId, ID.unique(), avatar);
      if (user.avatarId) await storage.deleteFile(bucketId, user.avatarId);
      const previewUrl = storage.getFilePreview(bucketId, $id);
      await databases.updateDocument(db, userCollection, user.$id, {
        userid: user.$id,
        avatar: previewUrl,
        avatarId: $id,
      });
      dispatch(setUser({ ...user, avatar: previewUrl, avatarId: $id }));
      return previewUrl;
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  return { signin, signup, signout, fetch_User_Cart, uploadAvatar };
}
