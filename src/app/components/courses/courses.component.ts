import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { AddFinalizeComponent } from './add-finalize/add-finalize.component';
import { OrderService } from '../order/order.service';
import { MenuService } from 'src/app/services/menu.service';

import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private orderService: OrderService,
    private menuService: MenuService,
    ) { }

  course: Course;
  courseName: string;
  courseItems: CourseItem[] = [];
  form: FormGroup;
  courseTotal: number = 0;
  menu: Menu;


  ngOnInit(): void {
    this.menu = this.menuService.getMenu();

    this.route.paramMap.subscribe((params) => {
      this.courseName = params.get('courseName');
      this.courseTotal = 0;
      this.menu.courses.forEach((course: Course) => {
        if(course.courseName === this.courseName) {
          this.course = course;
          this.calculateCourseTotal();
        }
      });
    });
    this.menuService.courseTotalSubscription.subscribe(() => {
      this.calculateCourseTotal();
    });
  }

  calculateCourseTotal() {
    this.courseTotal = 0;
    this.menu.courses.forEach((course: Course) => {
      if(course.courseName === this.courseName) {
        course.courseItems.forEach((courseItem: CourseItem ) => {
          this.courseTotal += courseItem.price * courseItem.amount;
        })
      } 
    });
  }
  onNaarBestellijst() {
    this.dialog.open(AddFinalizeComponent)
  }
}
