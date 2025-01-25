import { z } from "zod";
import { phoneSchema } from "./sign-up";

const fullnameSchema = z
  .string()
  .nonempty({ message: "Full name is required" })
  .min(5, { message: "Full name must be atleast 5 charecters" })
  .max(25, { message: "Full name must be atmost 25 charecters" });

const divisionSchema = z
  .string()
  .nonempty({ message: "division is required" })
  .min(3, { message: "division must be atleast 3 charecters" })
  .max(15, { message: "division must be atmost 15 charecters" });
const districtSchema = z
  .string()
  .nonempty({ message: "district is required" })
  .min(3, { message: "district must be atleast 3 charecters" })
  .max(15, { message: "district must be atmost 15 charecters" });
const upazilaSchema = z
  .string()
  .nonempty({ message: "upazila is required" })
  .min(3, { message: "upazila must be atleast 3 charecters" })
  .max(15, { message: "upazila must be atmost 15 charecters" });
const fullAddressSchema = z
  .string()
  .nonempty({ message: "Full Address is required" })
  .min(5, { message: "Full Address must be atleast 5 charecters" })
  .max(15, { message: "Full Address must be atmost 30 charecters" });

const addressSchema = z.object({
  fullname: fullnameSchema,
  phone: phoneSchema,
  division: divisionSchema,
  district: districtSchema,
  upazila: upazilaSchema,
  fullAddress: fullAddressSchema,
});
export default addressSchema;
