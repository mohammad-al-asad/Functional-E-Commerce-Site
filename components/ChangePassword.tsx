import React from "react";
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

function ChangePassword({ user }: { user: any}) {

  const { toast } = useToast();
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
                    description:"click on the link sent to your email address"
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

export default ChangePassword;
