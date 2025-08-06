import { z } from "zod";
import { fromError } from "zod-validation-error";

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signInSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
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

export const requestQuoteFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  service: z.string().min(1, { message: "Service is required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters long" }),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  oldImage: z.string().url({ message: "Old Image must be a Url" }),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});

export const uploadImagesSchema = z.object({
  assets: validateImageFiles().refine((files) => files.length > 0, {
    message: "At least one image is required",
  }),
});

export function validateImageFiles() {
  const maxUploadSize = 2 * 1024 * 1024; // 2MB
  const acceptedFileTypes = ["image/"];

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
      "All files must be valid image types"
    );
}

function validateImageFile() {
  const maxUploadSize = 1024 * 1024 * 2;
  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 2 MB`)
    .refine((file) => {
      return !file || acceptedFileTypes.includes(file.type);
    }, "File must be a valid image type (JPEG, PNG, WebP, GIF)");
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
