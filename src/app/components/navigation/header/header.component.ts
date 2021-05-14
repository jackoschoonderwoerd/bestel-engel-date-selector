import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/login/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../auth/login/login-dialog/login-dialog.component';
import { AdminData } from 'src/app/models/admin-data.model';
import { PickupTimeslotsService } from '../../order/order-form/pickup-timeslots.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  company: Company
  @Output() sideNavToggle = new EventEmitter<void>();
  courseNames: string[] = [];
  adminData: AdminData = { userName: '', isLoggedIn: false }
  isLoggedIn: boolean = false;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private pickupTimeslotsService : PickupTimeslotsService


  ) { }

  ngOnInit(): void {
    // this.pickupTimeslotsService.getNextWeek();
    this.company = this.menuService.getCompany();
    // setTimeout(() => {
    //   this.menuService.getCourseNames();
    // }, 1000);
    this.menuService.courseNamesChanged.subscribe((courseNames: string[]) => {
      this.courseNames = courseNames;
    });

    setTimeout(() => {
      this.authService.getAdminData();
    });
    this.authService.adminDataChanged.subscribe((adminData: AdminData) => {
      this.isLoggedIn = adminData.isLoggedIn;
      this.adminData = adminData;
    });
  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }
  courseSelected(courseName) {
    this.router.navigate(['/courses', { courseName: courseName }]);
  }
  onLogIn() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(result.userName === 'guus' && result.passWord === '123') {
        this.isLoggedIn = true;
        this.authService.login(result);
      } else {
        this.isLoggedIn = false;
      }
      // this.router.navigate(['/overview']);
    });
  }
  onLogOut() {
    this.authService.logOut();
    this.isLoggedIn = false;
  }
  
}
