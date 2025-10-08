import { AuthUserType } from ".";

export enum HomeType {
  condo = "condo",
  townhouse = "townhouse",
  apartment = "apartment",
}

export enum DocumentCategory {
  deed = "deed",
  mortgage = "mortgage",
  warranty = "warranty",
  insurance = "insurance",
  tax_record = "tax_record",
  utility_bill = "utility_bill",
  other = "other",
}

export enum ApplianceCategory {
  hvac = "hvac",
  kitchen = "kitchen",
  laundry = "laundry",
  plumbing = "plumbing",
  electrical = "electrical",
  security = "security",
  outdoor = "outdoor",
  other = "other",
}

export enum ReceiptSourceType {
  ocr = "ocr",
  manual_file = "manual_file",
  manual_text = "manual_text",
}

export enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
  urgent = "urgent",
}

export enum ReminderStatus {
  pending = "pending",
  in_progress = "in_progress",
  completed = "completed",
  cancelled = "cancelled",
  overdue = "overdue",
}

export enum ReminderType {
  hvac = "hvac",
  plumbing = "plumbing",
  appliance_maintenance = "appliance_maintenance",
  landscaping = "landscaping",
  security = "security",
  other = "other",
}

export enum ExpenseCategory {
  maintenance = "maintenance",
  utilities = "utilities",
  improvements = "improvements",
  insurance = "insurance",
  taxes = "taxes",
  other = "other",
}

export enum PublicRecordType {
  deed = "deed",
  tax_history = "tax_history",
  sale_history = "sale_history",
  plat_map = "plat_map",
  other = "other",
}

export enum ProviderType {
  plumbing = "plumbing",
  electrical = "electrical",
  hvac = "hvac",
  roofing = "roofing",
  landscaping = "landscaping",
  cleaning = "cleaning",
  pest_control = "pest_control",
  painting = "painting",
  general = "general",
  other = "other",
}

export interface Home {
  id: string;
  userId: string;
  address?: string;

  city?: string;

  state?: string;

  zipCode?: string;
  bedrooms?: number;
  bathrooms?: number;

  lat?: number;
  lng?: number;
  yearBuilt?: number;
  squareFeet?: number;
  lotSizeSqFt?: number;
  photoUrl?: string;
homeValue?: number
  homeType: HomeType;
  createdAt: Date;
  updatedAt: Date;

  documents: Document[];
  appliances: Appliance[];
  //   expenses    Expense[]
  records: PublicRecord[];
  //   reminders   Reminder[]
  //   providers   ServiceProvider[]
  //   serviceJobs ServiceHistory[]
}

export interface Appliance {
  id: string;
  homeId: string;
  name: string;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  purchaseDate?: Date | null;
  purchasePrice?: number | null;
  category: ApplianceCategory;
  warrantyExpiry?: Date | null;
  installationDate?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;

  // receipt?: Receipt | null;
  // maintenance?: ApplianceMaintenance[];
  home: Home;
  // reminders?: Reminder[];
  records: PublicRecord[];
}

export interface Document {
  id: string;
  homeId: string;
  userId: string;
  title: string;
  description?: string | null;
  category: DocumentCategory;
  fileUrl: string;
  isOcrProcessed: boolean;
  ocrText?: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;

  home: Home;
  user: AuthUserType;
}

export interface PublicRecord {
  id: string;
  homeId: string;
  recordType: PublicRecordType;
  data: Record<string, any>;
  retrievedAt: Date;
  updatedAt: Date;
  home: Home;
}
