export interface ContactMessage {
  date: string;
  messageID: string;
  customer: Customer;
  subject: string;
  comment: string;
  arhived: boolean;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
}
