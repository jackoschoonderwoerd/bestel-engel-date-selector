import { Component, OnInit }       from '@angular/core';
import { Observable }      from 'rxjs';
import { CoursesService } from './components/courses/courses.service';
import { OrderService } from './components/order/order.service';
import { MatDialog } from '@angular/material/dialog';
import { NietInGebruikDialogComponent } from './niet-in-gebruik-dialog/niet-in-gebruik-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
})
export class AppComponent implements OnInit {

  loadingStatus: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
    
  }
  ngOnInit() {
    // this.dialog.open(NietInGebruikDialogComponent); 
    this.orderService.loadingStatusChanged.subscribe((loadingStatus: boolean) => {
      this.loadingStatus = loadingStatus;
    });
  }
}
