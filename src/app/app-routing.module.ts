
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { CoursesComponent } from './components/courses/courses.component';
import { OverviewComponent } from './components/placed-orders/overview/overview.component';





const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'order', component: OrderComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'loading-error', component: HomeComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'overview-2', component: OverviewComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}