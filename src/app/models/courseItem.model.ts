export class CourseItem {

    constructor(
        public name: string,
        public price: number,
        public description?: string,
        public imageUrl?: string,
        public amount?: number,
    ) { }
}