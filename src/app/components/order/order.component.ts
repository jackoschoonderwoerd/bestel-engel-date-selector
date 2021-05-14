import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Course } from 'src/app/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { AddFinalizeComponent } from '../courses/add-finalize/add-finalize.component';
import { Menu } from 'src/app/models/menu.model';
import { Company } from 'src/app/models/company.model';
import { MenuService } from 'src/app/services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { OrderConfirmedDialogComponent } from './order-confirmed-dialog/order-confirmed-dialog.component';
import { OrderFailedDialogComponent } from './order-failed-dialog/order-failed-dialog.component';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  company: Company
  menu: Menu
  courses: Course[] = [];
  orderTotal: number = 0;
  loadingStatus: boolean = false;
  companyName: string;
  orderConfirmedSubjectSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private menuService: MenuService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {

     this.orderConfirmedSubjectSubscription = this.orderService.orderConfirmedSubject.subscribe(data => {
      console.log(data);
      const dialogRef =  this.dialog.open(OrderConfirmedDialogComponent);
      dialogRef.afterClosed().subscribe((message) => {
        console.log(message);
      })
    });

    this.orderService.orderFailedSubject.subscribe(data => {
      this.dialog.open(OrderFailedDialogComponent);
    })

    this.orderService.loadingStatusChanged.subscribe((loadingStatus: boolean) => {
      this.loadingStatus = loadingStatus;
    });
   

    this.company = this.menuService.getCompany();
    

    this.orderTotal = this.orderService.calculateOrderTotal();

    // this.orderService.orderStatusChanged.subscribe(
    //   () => {
    //     // this.maaltijdDealsTotalAmount = 0;
    //     // this.borrelDealsTotalAmount = 0;
    //   }
    // );
    this.orderService.orderCancelledSubscription.subscribe(() => {
      this.orderTotal = 0;
      // this.maaltijdDeals.total = 0;
      // this.borrelDealsTotalAmount = 0;
      // this.maaltijdDealsTotalPrice = 0;
      // this.borrelDealsTotalPrice = 0;
    });
    this.menuService.companySubscription.subscribe((company: Company) => {
      // console.log(company);
      this.company = company;
      // this.calculateOrderTotal();
    });
  }


  onOrderMore() {
    this.dialog.open(AddFinalizeComponent)
  }

  // openBorrelDealInfo() {
  //   this.dialog.open(BorreldealInfoDialogComponent);
  // }

  // openMaatijdDealInfo() {
  //   this.dialog.open(MaaltijddealInfoDialogComponent);
  // }
  ngOnDestroy() {
    this.orderConfirmedSubjectSubscription.unsubscribe();
  }
}
