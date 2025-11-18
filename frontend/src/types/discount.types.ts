export interface IDiscount {
  code: string;
  description: string;
  amount: number;
  minNights?: number;
  startDate?: string;
  endDate?: string;
  type: "percentage" | "fixed" | "nightly";
  name: string;
}
