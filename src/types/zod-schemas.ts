import { z } from "zod";
import { fromError } from "zod-validation-error";
import {
  EstimateLineItemCategory,
  EstimateLineItemUnitType,
} from "./message-schema";

export const unitTypeValues = Object.values(EstimateLineItemUnitType).filter(
  (v): v is EstimateLineItemUnitType => typeof v === "string"
);

export const categoryValues = Object.values(EstimateLineItemCategory).filter(
  (v): v is EstimateLineItemCategory => typeof v === "string"
);

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const signInSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
});

export const contactFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters long" }),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});

export const uploadImagesSchema = z.object({
  assets: validateImageFiles().refine((files) => files.length > 0, {
    message: "At least one image is required",
  }),
});

export const waitListSchema = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
  trade: z.string().optional(),
});

export const orgInfoSchema = z.object({
  companyName: z.string().min(1, { message: "Business Name is required" }),
  phoneNumber: z
    .string()
    .min(12, { message: "Please enter a valid US phone number" }),
  license: z.string().optional(),
  companyLogo: validateImageFile().optional(),
});

export const companyTradeSchema = z.object({
  companyTrade: z
    .array(z.string())
    .min(1, { message: "At least one trade is required" }),
});

export const pricingSchema = z.object({
  markupPercentage: z.number(),
  location: z.string().min(5, { message: "Location is required" }),
});

export const createClientSchema = z.object({
  name: z.string().min(3, { message: "Client name is required" }),
  email: z.email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  image: validateImageFile().optional(),
});

export const companyInfoSchema = z.object({
  ...orgInfoSchema.shape,
  ...companyTradeSchema.shape,
  ...pricingSchema.shape,
});

export const changePasswordSchema = z
  .object({
    ...resetPasswordSchema.shape,
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password cannot be the same as old password",
    path: ["newPassword"], // highlight the field causing the issue
  });

export const createEstimateLineItemSchema = z.object({
  title: z.string().min(1, "Item Description is required"),

  quantity: z.number().min(0.5, "Quantity must be 0.5 or greater"),

  cost: z.number().min(1, "Cost must be 1 or greater"),

  unitType: z.enum(EstimateLineItemUnitType, {
    message: `Unknown Unit Type`,
  }),

  category: z.enum(EstimateLineItemCategory, {
    message: `Unknown Category`,
  }),
});

export const estimateSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const estimateRatesSchema = z.object({
  taxName: z.string().min(1, "Tax name is required"),
  discountName: z.string().min(1, "Discount name is required"),
  taxRate: z.number().max(100, "Tax rate must be less than 100"),
  discountRate: z.number().max(100, "Discount rate must be less than 100"),
});

// Type inference

export function validateImageFiles() {
  const maxUploadSize = 2 * 1024 * 1024; // 2MB
  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/jpg",
  ];

  return z
    .array(z.instanceof(File))
    .max(8, "You can only upload up to 8 images")
    .refine(
      (files) => files.every((file) => file.size <= maxUploadSize),
      "Each file must be less than 2MB"
    )
    .refine(
      (files) =>
        files.every((file) =>
          acceptedFileTypes.some((type) => file.type.startsWith(type))
        ),
      "File must be a valid image type (JPEG, PNG, WebP, GIF, JPG)"
    );
}

function validateImageFile() {
  const maxUploadSize = 1024 * 1024 * 2;
  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/jpg",
  ];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 2 MB`)
    .refine((file) => {
      return !file || acceptedFileTypes.includes(file.type);
    }, "File must be a valid image type (JPEG, PNG, WebP, GIF, JPG)");
}

export function validateWithZodSchema<T>(
  schema: z.ZodType<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = fromError(result.error);
    throw new Error(errors.toString());
  }
  return result.data;
}

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
export type WaitListSchemaType = z.infer<typeof waitListSchema>;
export type PersonalInfoSchemaType = z.infer<typeof personalInfoSchema>;
export type CompanyInfoSchemaType = z.infer<typeof companyInfoSchema>;
export type OrgInfoSchemaType = z.infer<typeof orgInfoSchema>;
export type CompanyTradeSchemaType = z.infer<typeof companyTradeSchema>;
export type PricingSchemaType = z.infer<typeof pricingSchema>;
export type CreateClientSchemaType = z.infer<typeof createClientSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
export type CreateEstimateLineItemType = z.infer<
  typeof createEstimateLineItemSchema
>;

export type EstimateSchemaType = z.infer<typeof estimateSchema>;
export type EstimateRatesSchemaType = z.infer<typeof estimateRatesSchema>;
