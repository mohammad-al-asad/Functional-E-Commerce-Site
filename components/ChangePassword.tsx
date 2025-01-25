import React, { useState } from "react";
import { emailSchema, passwordSchema } from "@/schemas/sign-up";
import { account } from "@/lib/Appwrite";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ProfileEmail({ user, setUser }: { user: any; setUser: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailWarn, setEmailWarn] = useState("");
  const [password, setPassword] = useState("");
  const [passwordWarn, setPasswordWarn] = useState("");
  const { toast } = useToast();
  async function onSubmit() {
    if (email === user.email) return setEmailWarn("enter a new email");
    const emaiValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);
    if (!emaiValidation.success || !passwordValidation.success) {
      setEmailWarn(emaiValidation.error?.errors[0]?.message || "");
      setPasswordWarn(passwordValidation.error?.errors[0]?.message || "");
      return;
    }
    setIsOpen(false);
    setEmailWarn("");
    setPasswordWarn("");
    try {
      const updatedUser = await account.createRecovery(
        user.email,
        process.env.BASE_URL || ""
      );
      setUser({ ...updatedUser, avatar: user?.avatar });
      toast({
        title: "Email updated succesfuly",
      });
    } catch (error: any) {
      toast({
        title: "Error updating Email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div className="mb-10 self-center ml-1">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            variant="link"
            className="text-blue-500 text-xs ml-3 p-0 h-fit"
          >
            change password
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-main">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              We will send you a confirmation email. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-400"
              onClick={async () => {
                console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/change-password`);
                
                try {
                  await account.createRecovery(
                    user?.email,
                    `${process.env.NEXT_PUBLIC_BASE_URL}/change-password`
                  );
                  toast({
                    title:"We sent you a confirmation email",
                    description:"click the link sent to your email address"
                  });
                } catch (error: any) {
                  toast({
                    title: error.message,
                    variant: "destructive",
                  });
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

export default ProfileEmail;
