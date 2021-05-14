import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddFinalizeComponent } from '../courses/add-finalize/add-finalize.component';
import { Company } from 'src/app/models/company.model';
import { MenuService } from 'src/app/services/menu.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  company: Company;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private restaurantService: RestaurantsService
    ) { }

  ngOnInit(): void {
    if(!this.company) {
      this.company = this.restaurantService.getCompany();
      this.menuService.setCompany()
    }
  }

  onBestellen() {
    this.dialog.open(AddFinalizeComponent);
  }
}
