import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Modal } from "@/components/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FiEdit } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import useAppwrite from "@/lib/Appwrite";

function ProfileAvatar({ user, setUser }: { user: any; setUser: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const { toast } = useToast();
  const { uploadAvatar } = useAppwrite();

  async function onSubmit() {
    setIsOpen(false);
    try {
      if (avatar) {
        const avatarUrl = await uploadAvatar(avatar);
        
        setUser({ ...user, avatar: avatarUrl });
        toast({
          title: "Avatar updated succesfuly",
        });
      } else {
        throw Error("No image detected");
      }
    } catch (error: any) {
      toast({
        title: "Error updating avatar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAvatar(null);
    }
  }

  return (
    <div className="w-fit relative mb-2 self-center">
      <div className="w-[70px] h-[70px]">
      <Image
        fill
        className="rounded-full object-fill border-2"
        src={user?.avatar}
        alt={user?.name}
      />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <FiEdit
            size={23}
            className="text-gray-200 absolute -right-1.5 bottom-0.5"
          />
        </DialogTrigger>

        <Modal handleSubmit={onSubmit} field="Avatar">
          <div className="mb-1">
            <div className="space-y-2 text-main">
              <Label htmlFor="avatar" className="text-right text-white">
                Avatar
              </Label>
              <Input
                type="file"
                accept="images/*"
                onChange={(e) =>
                  setAvatar(e.target.files ? e.target.files[0] : null)
                }
                id="avatar"
                className="h-10"
              />
            </div>
          </div>
        </Modal>
      </Dialog>
    </div>
  );
}

export default ProfileAvatar;
