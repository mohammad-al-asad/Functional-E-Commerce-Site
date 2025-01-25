import React from 'react'
import { CgLogOut } from "react-icons/cg";
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
import { useToast } from "@/hooks/use-toast";
import useAppwrite from "@/lib/Appwrite";
import { useRouter } from 'next/navigation';

function ProfileLogout() {
    const router = useRouter();
    const { signout } = useAppwrite();
    const { toast } = useToast();
  return (
    <AlertDialog>
        <AlertDialogTrigger className="absolute right-6 top-6 p-3 py-1 w-fit bg-red-600 rounded-md text-white">
          <CgLogOut size={22} />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-main">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out from your account. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-400"
              onClick={() => {
                try {
                  signout();
                  router.push("/");
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
  )
}

export default ProfileLogout