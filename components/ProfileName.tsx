import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Modal } from "@/components/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usernameSchema } from "@/schemas/sign-up";
import { account } from "@/lib/Appwrite";
import { Button } from "./ui/button";
import { FiEdit3 } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";

function ProfileName({ user, setUser }: { user: any; setUser: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameWarn, setNameWarn] = useState("");
  const { toast } = useToast();
  async function onSubmit() {
    if (name === user.name) return setNameWarn("enter a new username");
    const validation = usernameSchema.safeParse(name);
    if (!validation.success) {
      setNameWarn(validation.error.errors[0].message);
      return;
    }
    setIsOpen(false);
    setNameWarn("");
    try {
      const updatedUser = await account.updateName(name);
      setUser({ ...updatedUser, avatar: user?.avatar });
      toast({
        title: "Username updated succesfuly",
      });
    } catch (error: any) {
      toast({
        title: "Error updating username",
        description: error.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="relative self-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <h1 className="text-white">
            {user?.name}

            <Button
              onClick={() => setIsOpen(true)}
              variant="link"
              className="absolute -right-10 top-0 text-blue-500 hover:no-underline h-fit"
            >
              <FiEdit3 size={20} />
            </Button>
          </h1>
        </DialogTrigger>

        <Modal handleSubmit={onSubmit} field="Username">
          <div className="mb-1">
            <div className="space-y-2 text-main">
              <Label htmlFor="name" className="text-right text-white">
                Name
              </Label>
              <Input
              placeholder="Enter a new username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="h-10"
              />
              {nameWarn && <p className="text-red-500 text-sm">{nameWarn}</p>}
            </div>
          </div>
        </Modal>
      </Dialog>
    </div>
  );
}

export default ProfileName;
