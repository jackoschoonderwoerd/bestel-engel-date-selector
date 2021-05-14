import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseItem } from '../models/courseItem.model';
import { Menu } from '../models/menu.model';
import { Company } from '../models/company.model';
import { CompanyInfo } from '../models/company-info.model';
import { RestaurantsService } from './restaurants.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router) {

  }
  selectedMenu: Menu;
  companyName: string;
  
  selectedCompany: Company
  companySubscription = new EventEmitter<Company>();
  menuSubscription = new EventEmitter<Menu>();
  courseTotalSubscription = new EventEmitter<void>();
  courseNamesChanged = new EventEmitter<string[]>();



  setCompany() {

    if (this.selectedCompany) {


    } else if (this.getFromLocalStorage()) {

      this.selectedCompany = this.getFromLocalStorage()
    } else {

      this.selectedCompany = this.restaurantsService.getCompany();

    }
    this.companySubscription.emit(this.selectedCompany);
    return this.selectedCompany;
  }

  getCompany() {
    if (this.selectedCompany) {

      return this.selectedCompany;
    } else if(this.getFromLocalStorage()) {

      this.selectedCompany = this.getFromLocalStorage();
      return this.selectedCompany;
    } else {

      return this.restaurantsService.getCompany()
    }
  }

  getMenu() {
    if (this.selectedCompany) {
      return this.selectedCompany.menu;
    } else if (this.getFromLocalStorage()) {
      const company: Company = JSON.parse(localStorage.getItem('EngelBewaarder'));
      return company.menu;
    }
    this.router.navigate(['loading-error', { message: 'Menu not found' }]);
  }

  getCourseNames() {
      let courseList: string[] = [];
      this.getMenu().courses.forEach((course: Course) => {
        courseList.push(course.courseName);
      });
      this.courseNamesChanged.emit(courseList);
  }

  updateMenu(courseName: string, updatedCourseItem: CourseItem) {
    if (this.selectedCompany) {

      this.updateCourseItemAmount(courseName, updatedCourseItem);
    } else if (this.getFromLocalStorage()) {

      this.selectedCompany = JSON.parse(localStorage.getItem('company'));
      this.updateCourseItemAmount(courseName, updatedCourseItem);
    } else {

      this.router.navigate(['loading-error'])
    }
    
    this.courseTotalSubscription.emit();
    this.setInLocalStorage();
  }

  private updateCourseItemAmount(courseName: string, updatedCourseItem: CourseItem) {

    this.selectedCompany.menu.courses.forEach((course: Course) => {
      if (course.courseName === courseName) {
        course.courseItems.forEach((courseItem: CourseItem) => {
          if (courseItem.name === updatedCourseItem.name) {
            courseItem.amount = updatedCourseItem.amount;
          }
        })
      }
    });

  }

  cancelOrder() {


    this.selectedCompany.menu.courses.forEach((course: Course) => {
      course.courseItems.forEach((courseItem: CourseItem) => {
        courseItem.amount = 0;
      });
    });
    

    // this.setInLocalStorage();
    localStorage.removeItem(this.companyName)
    this.companySubscription.emit(this.selectedCompany);
  }

  private setInLocalStorage() {
    console.log('setInLocalStorage() menuService.ts');
    // alert('setInLocalStorage(key, value) called')
    localStorage.setItem('EngelBewaarder', JSON.stringify(this.selectedCompany));
  }

  private getFromLocalStorage(): Company {


    if (localStorage.getItem('EngelBewaarder')) {
      return JSON.parse(localStorage.getItem('EngelBewaarder'));
    }
    return null;

  }
}

