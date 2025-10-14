import { z } from "zod";
import { fromError } from "zod-validation-error";
import { DocumentCategory } from "./prisma-schema-types";

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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
  name: z.string().min(1, { message: "Full Name is required" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
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

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  image: validateImageFile().optional(),
});

export const createHomeSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(3, { message: "State must be at least 3 characters" }),
});
export const createDocumentSchema = (type: "create" | "update") =>
  z.object({
    title: z.string().min(1, { message: "Document Title is required" }),
    description: z.string().optional(),
    category: z.enum([...Object.values(DocumentCategory)]),
    tags: z
      .array(z.string())
      .min(1, { message: "At least one tag is required" }),
    file:
      type === "create"
        ? validateDocumentFile()
        : validateDocumentFile().optional(),
  });

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
    "image/jpg",
  ];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 2 MB`)
    .refine((file) => {
      return !file || acceptedFileTypes.includes(file.type);
    }, "File must be a valid image type (JPEG, PNG, WebP, JPG)");
}

export function validateDocumentFile() {
  const maxUploadSize = 3 * 1024 * 1024; // 3MB
  const acceptedFileTypes = [
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  ];

  return z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= maxUploadSize,
      "File size must be less than 3MB"
    )
    .refine(
      (file) => !file || acceptedFileTypes.includes(file.type),
      "Only PDF, DOC, DOCX, XLS, and XLSX files are allowed"
    );
}

export function validateDocumentFiles() {
  const maxUploadSize = 5 * 1024 * 1024; // 5MB
  const acceptedFileTypes = [
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  ];

  return z
    .array(z.instanceof(File))
    .max(5, "You can only upload up to 5 documents")
    .refine(
      (files) => files.every((file) => file.size <= maxUploadSize),
      "Each file must be less than 5MB"
    )
    .refine(
      (files) => files.every((file) => acceptedFileTypes.includes(file.type)),
      "Only PDF, DOC, DOCX, XLS, and XLSX files are allowed"
    );
}

export function validatePDFOrImageFile() {
  const maxUploadSize = 3 * 1024 * 1024; // 3MB
  const acceptedFileTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  return z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= maxUploadSize,
      "File size must be less than 3MB"
    )
    .refine(
      (file) => !file || acceptedFileTypes.includes(file.type),
      "File must be a valid image type (JPEG, PNG, WebP, JPG) or PDF"
    );
}
export function validatePDFOrImageFiles() {
  const maxUploadSize = 3 * 1024 * 1024; // 3MB
  const acceptedFileTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  return z
    .array(z.instanceof(File))
    .max(5, "You can only upload up to 5 documents")
    .refine(
      (files) => files.every((file) => file.size <= maxUploadSize),
      "Each file must be less than 5MB"
    )
    .refine(
      (files) => files.every((file) => acceptedFileTypes.includes(file.type)),
      "Each File must be a valid image type (JPEG, PNG, WebP, JPG) or PDF"
    );
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
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
export type CreateHomeSchemaType = z.infer<typeof createHomeSchema>;
export type PersonalInfoSchemaType = z.infer<typeof personalInfoSchema>;
export type CreateDocumentSchemaType = z.infer<
  ReturnType<typeof createDocumentSchema>
>;
