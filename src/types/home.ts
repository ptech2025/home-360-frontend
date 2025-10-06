export enum HomeType {
  condo = "condo",
  townhouse = "townhouse",
  apartment = "apartment",
}

export interface Home {
  userId?: string;
  address?: string;

  city?: string;

  state?: string;

  zipCode?: string;

  lat?: number;
  lng?: number;
  yearBuilt?: number;
  squareFeet?: number;
  rooms?: number;
  lotSizeSqFt?: number;
  photoUrl?: string;

  homeType: HomeType;
  createdAt: Date;
  updatedAt: Date;

  //   documents   Document[]
  //   appliances  Appliance[]
  //   expenses    Expense[]
  //   records     PublicRecord[]
  //   reminders   Reminder[]
  //   providers   ServiceProvider[]
  //   serviceJobs ServiceHistory[]
}
