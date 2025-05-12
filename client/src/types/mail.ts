/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Mail {
    sender: any;
    routingArea:any;

    id: number;
    senderId: number;
    senderName: string;
    receiverName: string;
    receiverAddress: string;
    type: string;
    direction: string;
    delivererName: string;
    area: string;
    status: string;
}