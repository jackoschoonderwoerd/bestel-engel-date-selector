import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { PlacedOrdersService } from '../placed-orders.service';
import { CompletedOrder } from 'src/app/models/completed-order.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {


  weekDaysTimestamps: string[] = [];
  selectedDate: string;
  mySubscription: any;
  myInterval: any

  displayedColumns: string[] = [
    'nameAndOrderId',
    // 'name',
    'courses',
    'timestampPickupDate',
    'comments',
    'pickupTime',
  ];
  dataSource = new MatTableDataSource<any>();
  completedOrders: any;
  dateSelectorForm: FormGroup;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dateTimestamps: number[] = [];
  stringedDateTimestamps: string[];
  today: Date;
  selectedDateDefaultValue: number;

  constructor(
    private placedOrderService: PlacedOrdersService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
   }

  ngOnInit(): void {
    this.today = new Date();
    this.setDateTimestamps();
    setTimeout(() => {
  
      this.placedOrderService.getOrders();
      // PULL OUT THE ORDERDATE; FILTER DOESNT WORK ON NESTED THINGS
      this.placedOrderService.completedOrderSubscription.subscribe((completedOrders: any) => {
        completedOrders.forEach((order) => {
          console.log(new Date(order.OrderInfo.timestampPickupDate));
          order.dateOrdered = order.OrderInfo.timestampPickupDate;
        });
        this.dataSource.data = completedOrders;
      });
    });
    this.setSelectDateDefaultValue();
    this.myInterval =  setInterval(() => {
      this.onForceReload();
    }, 60 * 1000)
  }

  setSelectDateDefaultValue() {
    this.selectedDateDefaultValue = new Date().setHours(0,0,0,0)
    this.doFilter(this.selectedDateDefaultValue.toString())
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onPrintOrders() {
    window.print();
  }
  doDateFilter(filterValue: number) {
    this.dataSource.filter = filterValue.toString();
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectDateChange(e) {
  }

  setDateTimestamps() {   
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() -10));

    for(let i = 0; i < 14; i++) {
      this.dateTimestamps.push(new Date(yesterday.setDate(yesterday.getDate() + 1)).setHours(0,0,0,0));
    }
  }
  onForceReload() {
    console.log( 'force')
    // window.location.reload(true);
    this.router.navigate(['/overview-2'])
  }
  
 
  ngOnDestroy() {
    clearInterval(this.myInterval);
  }
}
