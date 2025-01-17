"use client";
import { verifySchema } from "@/schemas/verify";
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
import React, { use, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { account } from "@/lib/Appwrite";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

function Page() {
  const { phone }: { phone: string } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string>("");

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  });
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    async function sendOTP() {
      try {
        const response = await account.createPhoneVerification();
        toast({
          title: "We sent you an OTP code",
        });
        setUserId(response.userId);
      } catch (error: any) {
        console.log(error.message);
        toast({
          title: "Failed to send OTP",
          description: error.message,
          variant: "destructive",
        });
      }
    }

    if (user.phoneVerification) {
      router.push("/");
    } else {
      sendOTP();
    }
  }, [router, toast, user]);
  async function onSubmit(values: z.infer<typeof verifySchema>) {
    try {
      await account.updatePhoneVerification(userId, values.otp);
      toast({
        title: "Verification successful",
      });
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed to verify",
        description: error.message,
        variant: "destructive",
      });
    }
    router.push("/");
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-[28%] bg-main px-9 py-12 rounded-2xl m-auto">
        <h1 className="text-3xl block text-red-500 font-extrabold mb-2">
          Verify Now
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* OTP */}
            <div className="mt-3">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">OTP:</FormLabel>
                    <FormControl>
                      <Input placeholder="enter the otp code" {...field} />
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
                Verify
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
