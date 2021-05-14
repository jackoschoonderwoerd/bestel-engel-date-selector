import { CourseItem } from './courseItem.model';

export class Course {
    constructor(
        public courseName: string,
        public courseItems: CourseItem[],
        public courseSubtitle?: string, 
    ) { }
}