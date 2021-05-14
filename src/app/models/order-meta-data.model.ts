import { CustomerInfo } from './customer-info.model';
import { Menu } from './menu.model';


export class OrderMetaData {
    constructor(
        public timestampPickupDate: number,
        public pickupTime: string,
        public comments?: string,
    ) { }
}

// export class OrderInfo {
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