import {Customer} from "./customer";

export interface Order {
  id?: number;
  dishIds: number[];
  customer: Customer;
  status: string;
  amount: number;
}

