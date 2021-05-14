import { Component, OnInit, Output, EventEmitter, ApplicationRef, OnDestroy } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from '../../courses/courses.service';
import { Menu } from 'src/app/models/menu.model';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  mobileNavStatus: boolean = false;
  // courseNames: string[];
  menu: Menu;
  course;
  courseNames: string[] = [];
  company: Company;
  // @Output() sidenavToggle = new EventEmitter<void>();

  mySubscription: any;

  constructor(
    private router: Router,
    private menuService: MenuService) {

    // // select a different course => reinitailze component without refreshing
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
  }

  ngOnInit(): void {
    
    this.company = this.menuService.getCompany();
    this.company.menu.courses.forEach((course: Course) => {
      this.courseNames.push(course.courseName);
    })

  }
  
  onSidenavToggle() {
    console.log('onSidenavToggle()')
    // this.sidenavToggle.emit();
  }
  
  courseSelected(courseName) {
    this.toggleSideNav();
    // console.log(courseName);

    this.router.navigate(['/courses', {courseName: courseName}]);
  }

  onBestellen() {
    this.onSidenavToggle();
    this.router.navigate(['/order']);
    this.toggleSideNav();
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  toggleSideNav() {
    console.log('sidenav.component.ts: toggle()')
    this.mobileNavStatus = !this.mobileNavStatus;
  }
}
