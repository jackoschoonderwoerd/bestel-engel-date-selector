import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
// import { Company } from 'src/app/models/company.model';
import { Menu } from 'src/app/models/menu.model';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-add-finalize',
  templateUrl: './add-finalize.component.html',
  styleUrls: ['./add-finalize.component.css']
})
export class AddFinalizeComponent implements OnInit {

  courseNames: string[] = [];
  // company: Company;
  menu: Menu;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menu = this.menuService.getMenu();
    this.menu.courses.forEach((course: Course) => {
      this.courseNames.push(course.courseName);
    })
    // this.courseNames = this.coursesService.getCourseNames();
    // console.log(this.courseNames);
  }
  onSelectCourse(courseName) {
    this.router.navigate(['/courses', {courseName: courseName}]);
  }
  onFinalizeOrder() {
    this.router.navigate(['/order']);
  }
}
