import { CourseItem } from './courseItem.model';
import { MenuService } from '../services/menu.service';
import { Menu } from './menu.model';
import { CompanyInfo } from './company-info.model';

export class Company {
    constructor(
        public companyInfo: CompanyInfo,
        public menu: Menu,
    ) { }
}