import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Company } from './pages/company/company';
import { Employee } from './pages/employee/employee';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'company',
    component: Company
  },
  {
    path: 'employee',
    component: Employee
  },
  {
    path: '**',
    redirectTo: ''
  }
];