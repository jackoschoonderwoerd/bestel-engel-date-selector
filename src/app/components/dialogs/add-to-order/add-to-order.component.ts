import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContinueOrderingComponent } from '../continue-ordering/continue-ordering.component';

@Component({
  selector: 'app-add-to-order',
  templateUrl: './add-to-order.component.html',
  styleUrls: ['./add-to-order.component.css']
})
export class AddToOrderComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onContinueOrdering() {
    this.dialog.open(ContinueOrderingComponent);
  }

  onPlaceOrder() {
    this.router.navigate(['/order']);
  }
}
