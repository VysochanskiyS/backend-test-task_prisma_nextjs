import { ReqAddPayment } from "../types/network/payment";
import { network } from "./setupAxios";

export class PaymentNetwork {
  static async addPayments(payments: ReqAddPayment[]) {
    return  network.post("/payments", payments);
  }
}
