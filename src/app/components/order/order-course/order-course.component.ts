import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseItem } from 'src/app/models/courseItem.model';


@Component({
  selector: 'app-order-course',
  templateUrl: './order-course.component.html',
  styleUrls: ['./order-course.component.css']
})
export class OrderCourseComponent implements OnInit {

  @Input() course;
  ordersPresent: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.course.courseItems.forEach((courseItem: CourseItem) => {
      courseItem.amount = +courseItem.amount;
      if(courseItem.amount != 0) {
        this.ordersPresent = true
      }
    })
  }
  onEdit(courseName) {
    // console.log(courseName);
    this.router.navigate(['/courses', {courseName: courseName}])
  }
  
}
