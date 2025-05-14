/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Bill {
    client:any

    id: string;
    amount: number;
    billType: string;
    accountNumber: string;
    amountPaid: string;
    paymentMethod: Date;
    clientId: number;
    createdAt: Date;
    }