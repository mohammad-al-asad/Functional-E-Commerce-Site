import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Modal } from "@/components/Modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { IoLocationOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { z } from "zod";
import addressSchema from "@/schemas/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { bdData } from "@/bdData";
import { Input } from "./ui/input";
import { databases, db, userCollection } from "@/lib/Appwrite";

function AddressForm({ user, setUser }: { user: any; setUser: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      division: "",
      district: "",
      upazila: "",
      fullAddress: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    setIsOpen(false);
    try {
      const { fullAddress, fullname, district, division, upazila, phone } =
        values;
      await databases.updateDocument(db, userCollection, user.$id, {
        fullAddress,
        fullname,
        district,
        division,
        upazila,
        contactNumber: "+880" + phone,
      });
      setUser({
        ...user,
        fullAddress,
        fullname,
        district,
        division,
        upazila,
        contactNumber: "+880" + phone,
      });
      toast({
        title: "Address changed successful",
      });
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed changing address",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      form.reset();
    }
  }
  return (
    <div className="mb-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <p className="text-white w-fit mb-1 font-bold">
            Address Book
            <Button
              variant="link"
              className="text-blue-500 hover:no-underline h-fit w-fit"
            >
              Edit
            </Button>
          </p>
        </DialogTrigger>
        <hr />

        <Modal field="Address">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="w-[45%]">
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division</FormLabel>
                        <Select
                          onValueChange={(value: string) => {
                            setDivision(value);
                            form.setValue("division", value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-main">
                              <SelectValue placeholder="Select a division" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys(bdData).map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-[45%] text-white">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            className="text-main"
                            placeholder="Enter your Full-Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-[45%]">
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <Select
                          disabled={!division}
                          onValueChange={(value: string) => {
                            setDistrict(value);
                            form.setValue("district", value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-main">
                              <SelectValue placeholder="Select a district" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {division
                              ? Object.keys(
                                  bdData[division as keyof typeof bdData]
                                ).map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))
                              : null}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-[45%] text-white">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            className="text-main"
                            placeholder="+880"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-[45%]">
                  <FormField
                    control={form.control}
                    name="upazila"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upazila</FormLabel>
                        <Select
                          disabled={!district}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-main">
                              <SelectValue placeholder="Select a upazila" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {district
                              ? (
                                  bdData[
                                    division as keyof typeof bdData
                                  ] as Record<string, string[]>
                                )[district]?.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))
                              : null}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-[45%] text-white">
                  <FormField
                    control={form.control}
                    name="fullAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Input
                            className="text-main"
                            placeholder="Village/Road/Places"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                className="bg-main ml-[60%] mt-4"
                variant="outline"
                type="submit"
              >
                Save changes
              </Button>
            </form>
          </Form>
        </Modal>
      </Dialog>
      <div className="flex gap-1 items-center">
        <IoLocationOutline size={20} className="text-white" />
        <div className="p-2 text-base text-gray-200">
          {user?(
            <>
            <p>{`${user?.division}, ${user?.district}, ${user?.upazila}`}</p>
            <p>{user?.fullAddress}</p>
            </>
          ):(
            <>
            <p>Dhaka, Gazipur, Gazipur Sadar</p>
            <p>Natianal University</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
