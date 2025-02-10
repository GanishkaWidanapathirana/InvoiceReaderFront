
  
  export interface EmailBody {
    subject: string | null;
    body: string;
  }
  
  export interface InvoiceResponse {
    document_id:string | null;
    invoice_number: string | null;
    amount: string | null;
    due_date: string| null;
    payment_status: string;
    discount_rate: string | null;
    late_fee: string | null;
    grace_period: string | null;
    vendor_name: string | null;
    buyer_name: string | null;
    suggestions: string[];
    email_body: string;
  }
  
  export interface ApiResponse {
    response: InvoiceResponse;
  }
  
  export interface Invoice {
    id: number;
    invoice_number: string;
    amount: string;
    due_date: string| null;
    payment_status: string| null;
    buyer_name: string| null;
    vendor_name: string| null;
    document_id: string| null;
    user_email: string| null;
    discount_rate: string | null;
    grace_period: string | null;
    late_fee: string | null;
    suggestions: string | null;
}