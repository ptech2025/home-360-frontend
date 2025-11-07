import { z } from "zod";
import { fromError } from "zod-validation-error";
import {
  DocumentCategory,
  ProviderType,
  ReminderType,
  ReminderStatus,
  MaintenanceFrequency,
  HomeType,
  ExpenseCategory,
  ApplianceCategory,
} from "./prisma-schema-types";

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
      .min(1, { message: "At least one tag is required" })
      .max(5, "Maximum of 5 tags"),
    file:
      type === "create"
        ? validateDocumentFile()
        : validateDocumentFile().optional(),
  });

export const createServiceProviderSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.enum([...Object.values(ProviderType)], {
    message: `Provider Type is required and must be one of the following: ${Object.values(
      ProviderType
    ).join(", ")}`,
  }),
  phone: z.string().optional(),
  email: z.email({ message: "Invalid email address" }).optional(),
  address: z.string().optional(),
  website: z.url({ message: "Invalid website URL" }).optional(),
  notes: z
    .string()
    .max(100, { message: "Notes must be less than 100 characters" })
    .optional(),
});

export const createServiceJobSchema = z.object({
  homeId: z
    .string({ message: "Home is required" })
    .min(1, { message: "Home is required" }),
  jobDescription: z
    .string({ message: "Job Description is required" })
    .min(1, { message: "Job Description is required" })
    .max(100, { message: "Job Description must be less than 100 characters" }),
  date: z.coerce.date({ message: "Date is required" }),
  rating: z.coerce
    .number({ message: "Rating must be a number" })
    .min(1, { message: "Rating is required" })
    .max(5, {
      message: "Rating must be between 1 and 5",
    }),
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .min(1, { message: "Amount is required" }),
  file: validatePDFOrImageFile().optional(),
});

export const createHomeTaskSchema = z.object({
  title: z.string().min(1, { message: "Task Name is required" }),
  status: z
    .enum([...Object.values(ReminderStatus)], {
      message: `Status is required and must be one of the following: ${Object.values(
        ReminderStatus
      ).join(", ")}`,
    })
    .optional(),
  description: z
    .string()
    .max(100, { message: "Description must be less than 100 characters" })
    .optional(),
  category: z.enum([...Object.values(ReminderType)], {
    message: `Task Category is required and must be one of the following: ${Object.values(
      ReminderType
    ).join(", ")}`,
  }),
  frequency: z.enum([...Object.values(MaintenanceFrequency)], {
    message: `Frequency is required and must be one of the following: ${Object.values(
      MaintenanceFrequency
    ).join(", ")}`,
  }),
});

export const createExpenseSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .min(0, { message: "Amount must be greater than or equal to 0" }),
  category: z.enum([...Object.values(ExpenseCategory)], {
    message: `Category is required and must be one of the following: ${Object.values(
      ExpenseCategory
    ).join(", ")}`,
  }),
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().optional(),
  file: validatePDFOrImageFile().optional(),
});

export const createApplianceSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  category: z.enum([...Object.values(ApplianceCategory)], {
    message: `Category is required and must be one of the following: ${Object.values(
      ApplianceCategory
    ).join(", ")}`,
  }),
  purchaseDate: z.coerce.date().optional(),
  purchasePrice: z.coerce
    .number({ message: "Purchase price must be a number" })
    .int({ message: "Purchase price must be an integer" })
    .min(0, { message: "Purchase price must be greater than or equal to 0" })
    .optional(),
  warrantyExpiry: z.coerce.date().optional(),
  installationDate: z.coerce.date().optional(),
  image: validateImageFile().optional(),
  receipt: validatePDFOrImageFile().optional(),
});

export const createApplianceMaintenanceSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  maintenanceDate: z.coerce.date({ message: "Maintenance date is required" }),
  intervalMonths: z.coerce
    .number({ message: "Frequency must be a number" })
    .int({ message: "Frequency must be an integer" })
    .min(1, { message: "Frequency must be greater than or equal to 1" })
    .max(12, { message: "Frequency must be less than or equal to 12" }),
});

export const updateHomeDetailsSchema = z.object({
  yearBuilt: z.coerce
    .number({ message: "Year built must be a number" })
    .int({ message: "Year built must be an integer" })
    .min(1800, { message: "Year built must be at least 1800" })
    .max(new Date().getFullYear(), {
      message: `Year built cannot exceed ${new Date().getFullYear()}`,
    })
    .optional(),
  squareFeet: z.coerce
    .number({ message: "Square feet must be a number" })
    .int({ message: "Square feet must be an integer" })
    .optional(),
  lotSizeSqFt: z.coerce
    .number({ message: "Lot size must be a number" })
    .int({ message: "Lot size must be an integer" })
    .optional(),
  bathrooms: z.coerce
    .number({ message: "Bathrooms must be a number" })
    .int({ message: "Bathrooms must be an integer" })
    .optional(),
  bedrooms: z.coerce
    .number({ message: "Bedrooms must be a number" })
    .int({ message: "Bedrooms must be an integer" })
    .optional(),
  homeType: z.enum([...Object.values(HomeType)], {
    message: `Home type is required and must be one of the following: ${Object.values(
      HomeType
    ).join(", ")}`,
  }),
  file: validateImageFile().optional(),
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
    .max(5, "You can only upload up to 5s images")
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
  const maxUploadSize = 3 * 1024 * 1024; // 5MB
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
      "Each file must be less than 3MB"
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
      "Each file must be less than 3MB"
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

export type CreateServiceProviderSchemaType = z.infer<
  typeof createServiceProviderSchema
>;

export type CreateServiceJobSchemaType = z.infer<typeof createServiceJobSchema>;
export type CreateHomeTaskSchemaType = z.infer<typeof createHomeTaskSchema>;
export type CreateExpenseSchemaType = z.infer<typeof createExpenseSchema>;
export type CreateApplianceSchemaType = z.infer<typeof createApplianceSchema>;
export type CreateApplianceMaintenanceSchemaType = z.infer<
  typeof createApplianceMaintenanceSchema
>;
export type UpdateHomeDetailsSchemaType = z.infer<
  typeof updateHomeDetailsSchema
>;
