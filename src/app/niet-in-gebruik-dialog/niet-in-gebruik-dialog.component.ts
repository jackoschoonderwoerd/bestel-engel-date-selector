import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-niet-in-gebruik-dialog',
  templateUrl: './niet-in-gebruik-dialog.component.html',
  styleUrls: ['./niet-in-gebruik-dialog.component.css']
})
export class NietInGebruikDialogComponent implements OnInit {


  companies: string[] = [
    'testCompanyOne',
    'testCompanyTwo',
    'testCompanyThree'
  ]

  constructor() { }

  ngOnInit(): void {
  }

  selectCompany(company) {
    console.log(company);
  }
}
