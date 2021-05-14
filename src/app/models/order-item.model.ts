export class OrderItem {

    constructor(
        public name: string,
        public price: number,
        public amount?: number
    ) { }
}