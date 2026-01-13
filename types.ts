
export interface PaymentData {
  bankName: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  companyName: string;
  websiteUrl: string;
}

export enum BankType {
  BNI = 'BNI',
  BRI = 'BRI',
  BCA = 'BCA',
  MANDIRI = 'MANDIRI'
}
