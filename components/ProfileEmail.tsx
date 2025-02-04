import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Modal } from "@/components/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { emailSchema, passwordSchema } from "@/schemas/sign-up";
import { account } from "@/lib/Appwrite";
import { Button } from "./ui/button";
import { FiEdit3 } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";

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
      const updatedUser = await account.updateEmail(email, password);
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
    <div className="relative mb-10">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <h1 className="w-fit font-bold mb-1 text-white">
            Email
            <Button
              variant="link"
              className="absolute left-9 top-0 text-blue-500 hover:no-underline h-fit"
            >
              <FiEdit3 size={20} />
            </Button>
          </h1>
        </DialogTrigger>
        <p className="text-sm text-white">{user?.email}</p>

        <Modal handleSubmit={onSubmit} field="Email">
          <div className="mb-1">
            <div className="space-y-2 text-main mb-2">
              <Label htmlFor="email" className="text-right text-white">
                Email
              </Label>
              <Input
                value={email}
                placeholder="Enter a new email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="h-10"
              />
              {emailWarn && <p className="text-red-500 text-sm">{emailWarn}</p>}
            </div>

            <div className="space-y-2 text-main">
              <Label htmlFor="password" className="text-right text-white">
                Password
              </Label>
              <Input
              placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="h-10"
              />
              {passwordWarn && (
                <p className="text-red-500 text-sm">{passwordWarn}</p>
              )}
            </div>
          </div>
        </Modal>
      </Dialog>
    </div>
  );
}

export default ProfileEmail;
