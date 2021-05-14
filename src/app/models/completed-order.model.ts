
import { Course } from './course.model';
// import { OrderInfo } from './order-info.model';
import { Menu } from './menu.model';
// import { Discounts } from './discounts.model';
import { CustomerInfo } from './customer-info.model';
import { OrderInfo } from './order-info.model';

export class CompletedOrder {
    constructor(
        public id: string,
        public customerInfo: CustomerInfo,
        public orderInfo: OrderInfo,
        public sortedMenu: Menu,
        // public orderTotalPrice: number,
        // public timestamp: number,
        // public handled: boolean,
        // public destination?: string
    ) { }
}


// export class CompletedOrder {
//     constructor(
//         public id: string,
//         public customerInfo: CustomerInfo,
//         public sortedMenu: Menu,
//         public orderTotalPrice: number,
//         public timestamp: number,
//         public handled: boolean,
//         public destination?: string
//     ) { }
// }