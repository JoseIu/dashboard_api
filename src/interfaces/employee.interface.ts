export interface Employee {
  employee: EmployeeClass;
  description: string;
  contact: Contact;
  status: boolean;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface EmployeeClass {
  image: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  startDate: string;
}
