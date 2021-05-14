import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../order.service'
// import { Menu } from 'src/app/models/menu.model';
import { CancelOrderDialogComponent } from './cancel-order-dialog/cancel-order-dialog.component';
// import { Discounts } from 'src/app/models/discounts.model';

import { MenuService } from 'src/app/services/menu.service';
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { PhoneInfoComponent } from './phone-info/phone-info.component';
import { OrderInfo } from 'src/app/models/order-info.model';
import { OrderMetaData } from 'src/app/models/order-meta-data.model';
import { OrderAndCustomerInfo } from 'src/app/models/order-and-customer-info.model';
import { Subscription } from 'rxjs';
import { EmailInfoDialogComponent } from './email-info-dialog/email-info-dialog.component';
import { AfhaaltijdstipDialogComponent } from './afhaaltijdstip-dialog/afhaaltijdstip-dialog.component';
import { PickupTimeslotsService } from './pickup-timeslots.service';
import { PickupDatesService } from './pickup-dates.service';

// import { OrderInfo } from 'src/app/models/order-info.model';
// import { FinalizeErrorDialogComponent } from '../finalize-error-dialog/finalize-error-dialog.component';
// import { CoursesService } from '../../courses/courses.service';
// import { CourseItem } from 'src/app/models/courseItem.model';
// import { CompletedOrder } from 'src/app/models/completed-order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {



  // orders: CoffeeOrder[] = [];
  // orderAndCustomerInfo: OrderAndCustomerInfo
  totalPrice = 0;
  customerInfoForm: FormGroup;
  orderInfoFormValue;
  minDate: Date = new Date
  maxDate: Date;
  pickupTimeslots;
  orderConfirmedSubscription: Subscription;
  showPickupTimeslots: boolean = false;
  showPhoneIcon: boolean = false;
  selectedDateTimestamp: number;
  selectedDate: Date;
  today: Date = new Date()
  dateTimestamps: number [];
  pickupDates: string[] = [];
  showPickupDateInfoIcon: boolean = false;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private menuService: MenuService,
    private pickupTimeslotService: PickupTimeslotsService,
    private pickupDatesService: PickupDatesService) {

  }
  ngOnInit(): void {
    this.totalPrice = this.orderService.calculateOrderTotal();
    const currentHour = new Date().getHours()
    console.log(currentHour);
    if(currentHour >= 19) {
      this.showPickupDateInfoIcon = true;
    } 
      
    this.dateTimestamps = this.pickupDatesService.getDateTimestamps();
    this.pickupDates = this.pickupDatesService.getISODates();
   
    this.orderService.clearOrderFormSubject.subscribe(() => {
      this.ClearOrder();
    });
    this.orderConfirmedSubscription = this.orderService.orderConfirmedToOrderFormComponentSubject.subscribe((data) => {
      this.ClearOrder();
    });

    this.initForm();

    const orderDay = new Date()
    this.minDate = new Date()
    // this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    this.maxDate = this.pickupTimeslotService.getMaxDate(orderDay)

  }

  customerInfoFormChanged() {
   
    this.orderService.storeCustomerInfoFormValue(this.customerInfoForm.value);
    
  }

  

  pickupDateChanged(event) {
    this.customerInfoFormChanged();
    this.selectedDate = event.value;
    this.selectedDateTimestamp = new Date(event.value).getTime();
    // this.pickupTimeslots = this.pickupTimeslotService.getPickupTimeslots(this.selectedDateTimestamp);
    this.pickupTimeslots = this.pickupTimeslotService.getTimeslots(new Date(event.value))
    this.showPickupTimeslots = true;
 
  }

  pickupTimeChanged(event) {
    if(event.value.includes('haast?')) {
      this.showPhoneIcon = true;
      const dialogref =this.dialog.open(AfhaaltijdstipDialogComponent);
      dialogref.afterClosed().subscribe(() => {
        this.customerInfoForm.patchValue({
          pickupTime: null
        })
      });
    }
  }

  private initForm() {
    
    this.customerInfoForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      // pickupDate: new FormControl (new Date().getTime(), []),
      selectedDate: new FormControl(null, [Validators.required]),
      pickupTime: new FormControl(null, [Validators.required]),
      comments: new FormControl(null)
    });
    if (this.orderService.checkLSForCustomerInfo()) {
      const customerInfo = this.orderService.checkLSForCustomerInfo();
      if(customerInfo.selectedDate !== null) {
        this.showPickupTimeslots = true;
      }
      this.customerInfoForm.setValue({
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        // pickupDate: customerInfo.selectedDate,
        selectedDate: customerInfo.selectedDate,
        pickupTime: null,
        comments: customerInfo.comments
      });
    }
  }


  sendOrder() {
    console.log('sendOrder()');
    this.orderService.calculateOrderTotal();
    // SET PICKUPDATE TO TIMESTAMP AT 00:00
    const pickupDate = new Date(this.customerInfoForm.value.date).setHours(0,0,0,0);
    const timestampPickupDate = new Date(pickupDate).getTime();


    const orderAndCustomerInfo = new OrderAndCustomerInfo(
      new CustomerInfo(
        this.customerInfoForm.value.name,
        this.customerInfoForm.value.email,
        this.customerInfoForm.value.phone,
      ),
      new OrderInfo (
        this.customerInfoForm.value.selectedDate,
        this.customerInfoForm.value.pickupTime,
        this.customerInfoForm.value.comments
      )
    )
    console.log(orderAndCustomerInfo)
    this.orderService.postOrder(orderAndCustomerInfo);
  }

  onCancel() {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.menuService.cancelOrder();
        this.ClearOrder();
      }
    });
  }

  private ClearOrder() {
    console.log('clearing')
    this.customerInfoForm.reset();
    localStorage.clear();
    this.menuService.cancelOrder();
    this.router.navigate(['home']);
  }

  public onCancelOrder() {
    this.ClearOrder();
    this.router.navigate(['home']);
  }


  myDayFilter = (d: Date | null): boolean => {
    // TAKE OUT SUNDAYS, MONDAYS AND TUESDAYS
    const day = (d || new Date()).getDay();
    return day !== 0 && day !==1 && day !== 2 ;
  }

  onPhone() {
    this.dialog.open(PhoneInfoComponent);
  }
  onEmail() {
    this.dialog.open(EmailInfoDialogComponent);
  }
  onSelectPickupDateInfo() {
    this.dialog.open(AfhaaltijdstipDialogComponent);
  }

  ngOnDestroy() {
    // this.orderConfirmedSubjectSubscription.unsubscribe();
    // this.orderConfirmedSubscription.unsubscribe();
  }
  onAfhaalTijdstip() {
    this.dialog.open(AfhaaltijdstipDialogComponent);
  }
  onLocalPhone() {
    console.log('onLocalPhone()');
  }
}
