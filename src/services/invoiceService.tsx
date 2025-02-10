import axios from "axios";
import { Invoice } from "../types";
import apiUrl from "../components/config";

export const getInvoicesByEmail = async (userEmail: string): Promise<Invoice[]> => {
try {
  const response = await axios.get<Invoice[]>(`${apiUrl}/invoices/by-email`, {
    params: { user_email: userEmail }
  });
  return response.data;
} catch (error) {
  console.error("Error fetching invoices:", error);
  throw new Error("Failed to retrieve invoices. Please try again.");
}
};