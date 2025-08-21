import {
  EstimateLineItemCategory,
  EstimateLineItemUnitType,
} from "./message-schema";

export enum EstimateStatus {
  draft,
  assigned,
}

export interface Estimate {
  id: string;
  userId: string;
  title: string;
  status: EstimateStatus;
  subTotal: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  projectId: string | null;
  lineItems: EstimateLineItem[];
  estimateTax: EstimateTax | null
  estimateMarkup: EstimateMarkup | null
  estimateDiscount: EstimateDiscount | null
}

export interface EstimateLineItem {
  id: string;
  title: string;
  quantity: number;
  cost: number;
  itemTotal: number;
  unitType: EstimateLineItemUnitType;
  category: EstimateLineItemCategory;
}

export interface EstimateTax {
  id: string;
  estimateId: string;
  name: string;
  rate: number;
  estimate?: Estimate;
}

export interface EstimateMarkup {
  id: string;
  material: number;
  labor: number;
  other: number;
}

export interface EstimateDiscount {
  id: string;
  name: string;
  rate: number;
}
