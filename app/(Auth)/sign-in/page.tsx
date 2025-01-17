"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/schemas/signin";
import Link from "next/link";
import { account } from "@/lib/Appwrite";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/redux/AuthSlice";

function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    console.log(values);
    try {
      await account.createEmailPasswordSession(values.email, values.password);
      const user = await account.get();
      toast({
        title: "Login successful",
      });
      
      dispatch(setUser(user));
      router.push("/");
    } catch (error: any) {
      console.log(error.message);

      toast({
        title: "Failed to login",
        description: error.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-[28%] bg-main px-9 py-12 rounded-2xl m-auto">
        <h1 className="text-3xl block text-red-500 font-extrabold mb-2">
          Login Now
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* email */}
            <div className="mt-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email:</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* password */}
            <div className="mt-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password:</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6">
              <Button
                className="w-full mx-auto bg-red-500 hover:bg-red-400"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4">
          <p className="text-gray-500 text-sm text-center">
            Don&lsquo;t have an account?{"  "}
            <Link className="text-blue-500" href={"/sign-up"}>
              |Sign up|
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
