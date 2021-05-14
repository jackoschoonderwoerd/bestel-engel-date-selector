import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CoursesService } from '../../courses/courses.service';

@Component({
  selector: 'app-continue-ordering',
  templateUrl: './continue-ordering.component.html',
  styleUrls: ['./continue-ordering.component.css']
})
export class ContinueOrderingComponent implements OnInit {

  courses: string[] = [];
  constructor(
    private courseService: CoursesService,
    private router: Router) { }



  ngOnInit(): void {
    // this.courses = this.courseService.getCourses();
  }
  onCourse(course) {
    console.log(course);
    this.router.navigate([`${course}`])
  }
  onPlaceOrder(order) {
    this.router.navigate(['order']);
  }
}
