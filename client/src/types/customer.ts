export interface Customer {
  id: number;
  fName: string;
  lName: string;
  email: string;
  contactNum: string;
  address: string;
}

export interface CreateCustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  contactNum: string;
  address: string;
}