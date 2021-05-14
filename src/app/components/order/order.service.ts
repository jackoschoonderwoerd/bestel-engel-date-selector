import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CompletedOrder } from 'src/app/models/completed-order.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderSentDialogComponent } from './order-sent-dialog/order-sent-dialog.component';
import { Router } from '@angular/router';
// import { Discount } from 'src/app/models/discount.model';
// import { Discounts } from 'src/app/models/discounts.model';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/menu.model';
import { Course } from 'src/app/models/course.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { CustomerInfo } from 'src/app/models/customer-info.model';
// import { EmailLayoutService } from '../test/email-layout.service';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AnyLengthString } from 'aws-sdk/clients/comprehend';
import { OrderInfo } from 'src/app/models/order-info.model';
import { OrderAndCustomerInfo } from 'src/app/models/order-and-customer-info.model';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  totalMaaltijdDiscountPrice: number;
  totalBorrelhapjesDiscountPrice: number;
  loadingStatusChanged = new EventEmitter<boolean>();
  // orderStatusChanged = new EventEmitter<void>();
  orderCancelledSubscription = new EventEmitter<void>();
  customerInfo;
  orderConfirmedSubject = new Subject<string>();
  // orderConfirmedToOrderComponentSubject = new Subject<void>();
  orderConfirmedToOrderFormComponentSubject = new Subject<string>();
  orderFailedSubject = new Subject<void>();
  clearOrderFormSubject = new Subject<void>();

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private menuService: MenuService,
    // private emailLayoutService: EmailLayoutService

  ) { }


  calculateOrderTotal() {
    const menu: Menu = this.menuService.getMenu();
    const sortedMenu = this.sortMenu();
    let orderTotal = 0;
    menu.courses.forEach((course: Course) => {
      course.courseItems.forEach((courseItem: CourseItem) => {
        orderTotal += courseItem.price * courseItem.amount
      });
    });
    return orderTotal;
  }


  private countCourses(courseName: string, minPrice: number): number {
    let count = 0;
    const menu = this.menuService.getMenu()
    menu.courses.forEach((course: Course) => {
      if (course.courseName === courseName) {
        course.courseItems.forEach((courseItem: CourseItem) => {
          if (courseItem.price >= minPrice) {
            count += +courseItem.amount
          }
        });
      }
    })
    return count;
  }

  // ? https://stackoverflow.com/questions/38375646/filtering-array-of-objects-with-arrays-based-on-nested-value/38375768
  // REMOVE EMPTY COURSEITEMS
  private sortMenu(): Menu {
    
    const menu = this.menuService.getMenu();
    let sortedMenu = new Menu(menu.courses.filter((course) =>
    // some() : ARE THERE ANY VALUES THAT FIT THE CONDITION? IF SO, RETURNS TRUE, ELSE RETURNS FALSE
      course.courseItems.some((courseItem) => courseItem.amount !== 0))
      .map(element => {
        let newElt = Object.assign({}, element); // copies element
        newElt.courseItems = newElt.courseItems.filter(courseItem => courseItem.amount !== 0);
        return newElt;
      }));
    return sortedMenu
    // return menu;
  }

  postOrder(orderAndCustomerInfo: OrderAndCustomerInfo) {
    console.log(orderAndCustomerInfo.orderInfo);
    const completedOrder = new CompletedOrder(
      new Date().getTime().toString(), // ID
      orderAndCustomerInfo.customerInfo,
      orderAndCustomerInfo.orderInfo,
      this.sortMenu()
    );
    this.loadingStatusChanged.emit(true);


    return this.http.post(
      'https://djjy8u09n4.execute-api.eu-central-1.amazonaws.com/development/bestel-engel', completedOrder)
      .subscribe((data: CompletedOrder) => {
        // ? OPENS ORDERCONFIRMEDDIALOGCOMPONENT IN ORDER.COMPONENT.TS
        // ? INVOKES CLEARORDER() IN ORDER
        this.orderConfirmedToOrderFormComponentSubject.next('orderConfirmed')
        this.orderConfirmedSubject.next('orderConfirmedSubject fired');
        this.loadingStatusChanged.emit(false);
        this.clearOrderFormSubject.next();
        this.router.navigate(['/home']);
        console.log(data);
      });
  }

  handleError() { }



  storeCustomerInfoFormValue(customerInfo) {
    localStorage.setItem('customer-info', JSON.stringify(customerInfo));
  }

  checkLSForCustomerInfo() {
    if (localStorage.getItem('customer-info')) {
      return JSON.parse(localStorage.getItem('customer-info'))
    }
  }

  cancelOrder() {
    // this.coursesSevice.resetMenu();
    this.orderCancelledSubscription.emit();
  }
}
