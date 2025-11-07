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
  mortgage = "mortgage",  
  maintenance = "maintenance",  
  improvements = "improvements",
  utilities = "utilities",
  landscaping = "landscaping",
  safety = "safety",
  administrative = "administrative",  
  sustainability = "sustainability",
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

export enum MaintenanceFrequency {
  monthly = "monthly",
  quarterly = "quarterly",
  annual = "annual",
  biannual = "biannual",
  five_years = "five_years",
  ten_years = "ten_years",
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
  homeValue?: number;
  homeType: HomeType;
  createdAt: Date;
  updatedAt: Date;

  documents: Document[];
  appliances: Appliance[];
  expenses: Expense[];
  records: PublicRecord[];
  reminders: Reminder[];
  providers: ServiceProvider[];
  serviceJobs: ServiceHistory[];
}

export interface Appliance {
  id: string;
  homeId: string;
  name: string;
  image: string | null
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

  receipt: Receipt | null;
  maintenance: ApplianceMaintenance[];
  home: Home;
  reminders: Reminder[];
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
  previewUrl?: string | null;
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

export interface ServiceProvider {
  id: string;
  userId: string;
  name: string;
  type: ProviderType;
  phone: string | null;
  email: string | null;
  notes: string | null;
  address: string | null;
  website: string;
  avgRating: number | null;
  isHired: boolean;
  jobs: ServiceHistory[];
  createdAt: Date;
  updatedAt: Date;
  home: Home | null;
  user: AuthUserType;
  _count: { jobs: number };
}

export interface ServiceHistory {
  id: string;
  homeId: string;
  providerId: string;
  jobDescription: string;
  date: Date;
  invoiceUrl: string | null;
  previewUrl: string | null;
  rating: number | null;
  amount: number | null;
  createdAt: Date;
  updatedAt: Date;
  home: Home;
  provider: ServiceProvider;
}

export interface Receipt {
  id: string;
  applianceId: string | null;
  expenseId: string | null;
  fileUrl: string;
  previewUrl: string | null;
  sourceType: ReceiptSourceType;
  extracted: Record<string, any> | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;

  appliance: Appliance | null;
  expenses: Expense | null;
  maintenances: ApplianceMaintenance[];
}

export interface Expense {
  id: string;
  title: string;
  homeId: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  home: Home;
  receipts: Receipt[];
}

export interface ApplianceMaintenance {
  id: string;
  applianceId: string | null;
  receiptId: string | null;
  description: string | null;
  maintenanceDate: Date | null;
  cost: number | null;
  intervalMonths: number | null;
  status: ReminderStatus;
  createdAt: Date;
  updatedAt: Date;

  appliance: Appliance | null;
  receipt: Receipt | null;
}

export interface Reminder {
  id: string;
  userId: string;
  homeId: string;
  applianceId: string | null;
  priority: Priority;
  taskName: string;
  dueDate: Date;
  status: ReminderStatus;
  type: ReminderType;
  createdAt: Date;
  updatedAt: Date;

  user: AuthUserType;
  home: Home;
  appliance: Appliance | null;
}

export interface MaintenanceInstance {
  id: string;
  templateId: string | null;
  homeId: string;
  userId: string;
  title: string;
  description: string | null;
  dueDate: Date;
  frequency: MaintenanceFrequency;
  status: ReminderStatus;
  completedAt: Date | null;
  category: ReminderType;
  isCustom: boolean;
  reminderSent: boolean;
  reminderSentAt: Date | null;
  estimatedCost: number | null;
  createdAt: Date;
  updatedAt: Date;

  home: Home;
  user: AuthUserType;
}
