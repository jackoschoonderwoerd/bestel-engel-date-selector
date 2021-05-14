import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompletedOrder } from 'src/app/models/completed-order.model';
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { Menu } from 'src/app/models/menu.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { Course } from 'src/app/models/course.model';
import * as AWS from 'aws-sdk';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as  environment  from './../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class PlacedOrdersService {

  // dbMenu: Menu = { courses: [] };
  // dbCustomerInfo: CustomerInfo;
  // dbCompletedOrder: CompletedOrder;
  // name: string;
  // pickupDate: string;
  // pickupTime: string;
  // completedOrder: CompletedOrder;
  // dbCompletedOrders: CompletedOrder[] = [];
  completedOrderSubscription = new EventEmitter<CompletedOrder[]>();


  constructor(
    private http: HttpClient
  ) { }


  getOrders() {
    // this.http.get('https://65qdu0ddyk.execute-api.eu-central-1.amazonaws.com/dev/captein-en-co')
    this.http.get('https://djjy8u09n4.execute-api.eu-central-1.amazonaws.com/development/bestel-engel/BLABLA')
      .subscribe((data: any) => {

        let completedOrders = data.Items;

        completedOrders.forEach(order => {
          order.OrderInfo.timestampPickupDate = new Date(order.OrderInfo.timestampPickupDate).setHours(0,0,0,0);
        });
        completedOrders = this.sortCompletedOrdersByPickupTime(completedOrders);
        // console.log(completedOrders);
        

        this.completedOrderSubscription.emit(completedOrders);
        return completedOrders;
      });
  }
  getMe() {
    // this.http.get(environment.environment.)
  }

  sortCompletedOrdersByPickupTime(completedOrders) {
    completedOrders = completedOrders.sort((a, b) => {
      if (a.OrderInfo.pickupTime < b.OrderInfo.pickupTime) {
        return -1;
      } else if (a.OrderInfo.pickupTime > b.OrderInfo.pickupTime) {
        return 1;
      } else {
        return 0;
      }
    });
    return completedOrders;
  }

  delete() {
    this.http.delete('https://djjy8u09n4.execute-api.eu-central-1.amazonaws.com/development/bestel-engel')
      .subscribe(data => console.log('returned by aws', data));
    console.log('deleting');
  }

}
