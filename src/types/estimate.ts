import {
  EstimateLineItemCategory,
  EstimateLineItemUnitType,
} from "./message-schema";

import { Project } from "./project";

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
  project: Project;
  lineItems: EstimateLineItem[];
  estimateTax: EstimateTax;
  estimateMarkup: EstimateMarkup;
  estimateDiscount: EstimateDiscount;
  calculations: {
    subTotal: number;
    markupValue: number;
    costAfterMarkup: number;
    discountValue: number;
    costAfterDiscount: number;
    taxValue: number;
    totalAmount: number;
  };
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
  rate: number;
  value: number;
}

export interface EstimateDiscount {
  id: string;
  name: string;
  rate: number;
}
