import { CustomerInfo } from './customer-info.model';
import { OrderInfo } from './order-info.model';

export class OrderAndCustomerInfo {
    constructor(
        public customerInfo: CustomerInfo,
        public orderInfo: OrderInfo
    ) { }
}

// export class CustomerInfo {
//     constructor(
//         public name: string,
//         public delivery: string,
//         public email: string,
//         public pickupDate: Date,
//         public pickupTime: string,
//         public comments?: string,
//         public address?: string,
//         public phone?: string
//     ) { }
// }