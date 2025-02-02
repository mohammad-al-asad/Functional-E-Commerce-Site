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
import { useRouter, useSearchParams } from "next/navigation";
import useAppwrite, { account } from "@/lib/Appwrite";
import { useToast } from "@/hooks/use-toast";
import { changePasswordSchema } from "@/schemas/changePassword";
import Error from "next/error";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";

function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const user = useSelector<RootState>((state) => state.auth.user);
  const { toast } = useToast();
  const router = useRouter();
  const { signout } = useAppwrite();

  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [router]);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    try {
      if (userId && secret)
        await account.updateRecovery(userId, secret, values.newPassword);
      toast({
        title: "Password changed successfully",
      });
      signout();
      router.replace("/sign-in");
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed to change password",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  if (!userId || !secret) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-[28%] bg-main px-9 py-12 rounded-2xl m-auto">
        <h1 className="text-3xl block text-red-500 font-extrabold mb-2">
          Password Reset
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* New Password */}
            <div className="mt-3">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">New Password:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter a new password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Confirm Password */}
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
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
