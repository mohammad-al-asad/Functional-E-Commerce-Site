import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Modal } from "@/components/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { phoneSchema, passwordSchema } from "@/schemas/sign-up";
import { account } from "@/lib/Appwrite";
import { Button } from "./ui/button";
import { FiEdit3 } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function ProfilePhone({ user, setUser }: { user: any; setUser: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneWarn, setPhoneWarn] = useState("");
  const [password, setPassword] = useState("");
  const [passwordWarn, setPasswordWarn] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit() {
    if ("+880" + phone === user.phone)
      return setPhoneWarn("enter a new phone number");
    const emaiValidation = phoneSchema.safeParse(phone);
    const passwordValidation = passwordSchema.safeParse(password);
    if (!emaiValidation.success || !passwordValidation.success) {
      setPhoneWarn(emaiValidation.error?.errors[0]?.message || "");
      setPasswordWarn(passwordValidation.error?.errors[0]?.message || "");
      return;
    }
    setIsOpen(false);
    setPhoneWarn("");
    setPasswordWarn("");
    try {
      const updatedUser = await account.updatePhone("+880" + phone, password);
      setUser({ ...updatedUser, avatar: user?.avatar });
      toast({
        title: "Phone number updated succesfuly",
      });
      router.push("/sign-up/verify");
    } catch (error: any) {
      toast({
        title: "Error updating Phone number",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPhone("");
      setPassword("");
    }
  }
  return (
    <div className="relative mb-10">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
      <h1 className="w-fit font-bold mb-1 text-white">Phone

          <Button
            variant="link"
            className="absolute left-11 top-0 text-blue-500 hover:no-underline h-fit"
          >
            <FiEdit3 size={20} />
          </Button>
      </h1>
        </DialogTrigger>
        <p className="text-sm text-white">{user?.phone}</p>

        <Modal handleSubmit={onSubmit} field="Phone number">
          <div className="mb-1">
            <div className="space-y-2 text-main mb-2">
              <Label htmlFor="email" className="text-right text-white">
                Phone
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                className="h-10"
                placeholder="+880"
              />
              {phoneWarn && <p className="text-red-500 text-sm">{phoneWarn}</p>}
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

export default ProfilePhone;
