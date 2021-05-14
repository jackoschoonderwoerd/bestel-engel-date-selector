import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { CompanyInfo } from '../models/company-info.model';
import { Menu } from '../models/menu.model';
import { Course } from '../models/course.model';
import { CourseItem } from '../models/courseItem.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  // ? MENU 06-01-2021
  engelbewaarder = new Company(
    new CompanyInfo('Café de Engelbewaarder'),
    new Menu([
      new Course('hoofdgerechten', [
        new CourseItem(
          'Spatchcock poussin',
          14.5,
          'met chimichurri, zoete aardappel, koolsla en dragon mayonaise',
          'https://www.instagram.com/p/COXN72VFDuz/?utm_source=ig_web_copy_link',
          0),
        new CourseItem(
          'Hamburger',
          15,
          'met friet en sla',
          null,
          0),
        new CourseItem(
          'Confit de canard',
          15,
          'met krieltjes, peultjes, bospeen en munt pesto',
          null,
          0),
        new CourseItem(
          'Gamba’s Knoflook Groot',
          18,
          'chili en pernod, inclusief brood en sla',
          null,
          0),
        new CourseItem(
          'Gamba’s Knoflook Klein',
          9,
          'chili en pernod',
          null,
          0),
        new CourseItem(
          'Vega burrito',
          13.5,
          'met zwarte bonen, salsa roja, koriander, limoen, guacamole, zure room en queso blanco',
          null,
          0),
        new CourseItem(
          'Falafelburger',
          12.5,
          'met tzatziki en gegrilde aubergine (vega)',
          null,
          0),
      ]),
      new Course('bijgerechten', [
        new CourseItem(
          'Friet',
          3,
          '',
          '',
          0
        ),
        new CourseItem(
          'Salade',
          4,
          '',
          '',
          0
        )
      ]),
    ])
  );

  constructor() { }

  getCompany() {
    return this.engelbewaarder;
  }
}


// ? OUD MENU
  // engelbewaarder = new Company(
  //   new CompanyInfo('Café de Engelbewaarder'),
  //   new Menu([
  //     new Course('hoofd', [
  //       new CourseItem(
  //         'marrokaanse lamsstoof',
  //         15, 
  //         'couscous, komijnyoghurt', 
  //         'https://bestel-engel.s3.eu-central-1.amazonaws.com/assets/images/course-items/moroccan-lambstew.jpg', 
  //         0),
  //       new CourseItem(
  //         'gevulde pijlinktvis', 
  //         15, 
  //         'limaboontjes in tomatensaus, geblakerde prei, persillade', 
  //         'https://bestel-engel.s3.eu-central-1.amazonaws.com/assets/images/course-items/Stuffedsquid.jpg', 
  //         0),
  //       new CourseItem(
  //         'melanzane parmigiana', 
  //         15,
  //         null, 
  //         'https://bestel-engel.s3.eu-central-1.amazonaws.com/assets/images/course-items/parmigiana-di-melanzane.jpg', 
  //         0)
  //     ]),
  //     new Course('dessert', [
  //       new CourseItem('brownie', 4, '', '', 0)
  //     ]),
  //     new Course('wijn', [
  //       new CourseItem('tarapaca carmenère (rood)', 12.5, '', '', 0),
  //       new CourseItem('sanziana pinot grigio (wit)', 12.5, '', '', 0 ),
  //       new CourseItem('tour des pins pays d\'oc (wit)', 12.5, '', '', 0)
  //     ])
  //   ])
  // );