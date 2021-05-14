import { Injectable, EventEmitter } from '@angular/core';


// import { Course } from 'src/app/models/course.model';
// import { CourseItem } from 'src/app/models/courseItem.model';
// import { ActivatedRoute } from '@angular/router';
// import { OrderItem } from 'src/app/models/order-item.model';
// import { OrderedItem } from 'src/app/models/ordered-item.model';
// import { NewOrderedItem } from 'src/app/models/new-ordered-item.model';
// import { Menu } from 'src/app/models/menu.model';
// import { MenuService } from 'src/app/services/menu.service';
// import { CompanyService } from 'src/app/services/company.service';




@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  

  // courseAmount: number = 0;
  // courseTotalChanged = new EventEmitter<number>();
  // orderedItems = [];
  
  // menu;  

  // courseNames: string[] = []

  // constructor() { }

  // getMenu() {
    // // called by app.component.ts
    // this.menu = this.menuService.getMenu();
    // // this.menu = this.companyService.getTestCompany().menu;
    // console.log(this.menu);
    // if(localStorage.getItem('orderedItems')) {
    //   this.orderedItems = JSON.parse(localStorage.getItem('orderedItems'));
    //   this.menu.courses.forEach(course => {
    //     const courseItem = course.courseItems;
    //     courseItem.forEach(courseItem => {
    //       this.orderedItems.forEach(orderedItem => {
    //         if(courseItem.name === orderedItem.courseItemName){
    //           courseItem.amount = orderedItem.courseItemAmount;
    //         }
    //       })
    //     })
    //   });
    // }
    // return this.menu;
  // }
  // resetMenu() {
  //   this.menu.courses.forEach(course => {
  //     course.courseItems.forEach(courseItem => {
  //       courseItem.amount = 0;
  //     })
  //   })
  // }

  // getCourseNames() {
  //   if(this.courseNames = []) {
  //     this.menu.courses.forEach(course => {
  //       this.courseNames.push(course.courseName)
  //     });
  //   }
  //   return this.courseNames
  // }

  // getOrderedItems() {
    // if(localStorage.getItem('orderedItems')) {
    //   this.orderedItems = JSON.parse(localStorage.getItem('orderedItems'));
    //   // console.log(this.orderedItems);
    // }  else {
    //   this.orderedItems = [];
    // }
    // // console.log('course.service:this.orderedItems: ', this.orderedItems);
    // return this.orderedItems;
  // }

  // getCourse(courseName):Course[] {

  //   const selectedCourse = this.menu.courses.filter((course) => {
  //     return course.courseName === courseName;
  //   })
  //   // console.log(selectedCourse);
  //   return selectedCourse;
  // }

  // addOrUpdateOrderItem(courseName: string, courseItem: CourseItem) {
    
   
    // // create newOrderedItem
    // const newOrderedItem = new NewOrderedItem(courseName, courseItem.name, +courseItem.amount);
    // console.log(newOrderedItem);
    // // check to see if this newOrderedItem has already been ordered
    // const index = this.orderedItems.findIndex((orderedItem: NewOrderedItem) => {
    //   return orderedItem.courseItemName === courseItem.name && orderedItem.courseName === courseName;
    // });
    // // if not; add the newOrderedItem to orderdItems
    // if(index === -1) {
    //   this.orderedItems.push(newOrderedItem)
    // } else {
    //   // else update the amount of the already orderedItem
    //   this.orderedItems[index].courseItemAmount = courseItem.amount
    // }
    // this.storeOrderedItemsInLocalStorage();
    // // this.calculateCourseTotal(courseName)
  // }

  // storeOrderedItemsInLocalStorage() {
  //   localStorage.setItem('orderedItems', JSON.stringify(this.orderedItems));
  // }

  // calculateCourseTotal(courseName) {
  //   let courseTotal: number = 0;
  //   const courseArray: Course[] = this.getCourse(courseName)
  //   const course = courseArray[0];
  //   course.courseItems.forEach(courseItem => {
  //     if(courseItem.amount !== undefined) {
  //       courseTotal = courseTotal + courseItem.price * courseItem.amount
  //     }
  //   })
  //   this.courseTotalChanged.emit(courseTotal);
  // }

  // calculateOrderTotal() {
  //   let total = 0
  //   const menu = this.getMenu();
  //   if(localStorage.getItem('orderedItems')) {
  //     const orderedItems = JSON.parse(localStorage.getItem('orderedItems'));
  //     menu.courses.forEach(course => {
  //       const courseItems = course.courseItems
  //       courseItems.forEach(courseItem => {
  //         orderedItems.forEach(orderedItem => {
  //           if(courseItem.name === orderedItem.courseItemName) {
  //             const subTotal = courseItem.price * orderedItem.courseItemAmount;
  //             total = total + subTotal;
  //           }
  //         })
  //       })
  //     })
  //   }
  //   return total;
  // }

  // calculateWineBottles() {
    // let totalWijn = 0
    // const menu = this.getMenu();
    // // if(localStorage.getItem('orderedItems')) {
    //   menu.courses.forEach(course => {
    //     if(course.courseName === 'wijn') {
    //       const wijnCourse = course;
    //       wijnCourse.courseItems.forEach(courseItem => {
    //         totalWijn = totalWijn + +courseItem.amount;
    //       }) 
    //     }
    //   })
    // // }
    // return totalWijn;
  // }

  

  // getCourseItemsNamesPricesAmounts(): Array<{name: string, amount: number, price: number}> {
  //   const collection = [];
  //   // console.log(this.menu);
  //   this.menu.courses.forEach(course => {
  //     // console.log(course.courseName);
  //     const name = course.courseName;
  //     course.courseItems.forEach((courseItem: CourseItem) => {
  //       // console.log(courseItem.price, courseItem.amount)
  //       const price = courseItem.price;
  //       const amount = courseItem.amount;
  //       collection.push({name: name, price: price, amount: +amount})
  //     })
  //   })
  //   // console.log(collection);
  //   // return [{name: 'jacko', amount: 4, price: 5}, {name: 'karel', amount: 2, price: 3}]
  //   return collection;
  // }

  // orderedItemsCount(courseName) {
    // let total = 0
    // const menu = this.getMenu();
    //   menu.courses.forEach(course => {
    //     if(course.courseName === courseName) {
    //       const mealsCourse = course;
    //       mealsCourse.courseItems.forEach(courseItem => {
    //         if (courseItem.amount === undefined || courseItem.price <= 3) {
    //           courseItem.amount = 0;
    //         } else {
    //           courseItem.amount = courseItem.amount;
    //         }
    //         total = total + +courseItem.amount;
    //       }) 
    //     }
    //   })
    // return total;
  // }
}

