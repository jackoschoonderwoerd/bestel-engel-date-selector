import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';





import { OrderComponent } from './components/order/order.component';
import { AddToOrderComponent } from './components/dialogs/add-to-order/add-to-order.component';
import { ContinueOrderingComponent } from './components/dialogs/continue-ordering/continue-ordering.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';


import { CoursesComponent } from './components/courses/courses.component';
import { CourseItemComponent } from './components/courses/course-item/course-item.component';
import { OrderCourseComponent } from './components/order/order-course/order-course.component';
import { AddFinalizeComponent } from './components/courses/add-finalize/add-finalize.component';
import { CourseItemInfoDialogComponent } from './components/courses/course-item/course-item-info-dialog/course-item-info-dialog.component';

import { HttpClientModule } from '@angular/common/http';
import { OrderSentDialogComponent } from './components/order/order-sent-dialog/order-sent-dialog.component';
import { CancelOrderDialogComponent } from './components/order/order-form/cancel-order-dialog/cancel-order-dialog.component';
import { NietInGebruikDialogComponent } from './niet-in-gebruik-dialog/niet-in-gebruik-dialog.component';
import { OverviewComponent } from './components/placed-orders/overview/overview.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginDialogComponent } from './components/auth/login/login-dialog/login-dialog.component';
import { OrderConfirmedDialogComponent } from './components/order/order-confirmed-dialog/order-confirmed-dialog.component';
import { OrderFailedDialogComponent } from './components/order/order-failed-dialog/order-failed-dialog.component';
import { CourseItemDetailsComponent } from './components/courses/course-item/course-item-details/course-item-details.component';
import { PhoneInfoComponent } from './components/order/order-form/phone-info/phone-info.component';
import { EmailInfoDialogComponent } from './components/order/order-form/email-info-dialog/email-info-dialog.component';
import { AfhaaltijdstipDialogComponent } from './components/order/order-form/afhaaltijdstip-dialog/afhaaltijdstip-dialog.component';



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    OrderComponent,
    AddToOrderComponent,
    ContinueOrderingComponent,
    OrderFormComponent,
    CoursesComponent,
    CourseItemComponent,
    OrderCourseComponent,
    AddFinalizeComponent,
    CourseItemInfoDialogComponent,
    OrderSentDialogComponent,
    CancelOrderDialogComponent,
    NietInGebruikDialogComponent,
    OverviewComponent,
    LoginComponent,
    LoginDialogComponent,
    OrderConfirmedDialogComponent,
    OrderFailedDialogComponent,
    CourseItemDetailsComponent,
    PhoneInfoComponent,
    EmailInfoDialogComponent,
    AfhaaltijdstipDialogComponent,


  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddToOrderComponent,
    ContinueOrderingComponent
  ]
})
export class AppModule {
  constructor() {
  }
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/