"use client";
import { signUpSchema } from "@/schemas/sign-up";
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
import { account } from "@/lib/Appwrite";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
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

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    values.phone = "+880" + values.phone;
    try {
      await account.create(
        Date.now().toString(),
        values.email,
        values.password,
        values.username
      );
      await account.createEmailPasswordSession(values.email, values.password);
      await account.updatePhone(values.phone, values.password);
      const user = await account.get();
      dispatch(setUser(user));

      toast({
        title: "Account created successfully",
      });
      router.push(`/sign-up/verify`);
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed to create account",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-[28%] bg-main px-9 py-12 rounded-2xl m-auto">
        <h1 className="text-3xl block text-red-500 font-extrabold mb-2">
          Register Now
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Username */}
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username:</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone */}
            <div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Phone:</FormLabel>
                    <FormControl>
                      <Input placeholder="+880" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <div className="mt-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email:</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password */}
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

            {/* Confirm password */}
            <div className="mt-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Confirm Password:
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="confirm your password"
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4">
          <p className="text-gray-500 text-sm text-center">
            Don&lsquo;t have an account?{"  "}
            <Link className="text-blue-500" href={"/sign-in"}>
              |Sign in|
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
