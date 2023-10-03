import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './login/profile/profile.component';
import { SuccessComponent } from './login/success/success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegComponent } from './reg/reg.component';
import { ContactsComponent } from './test/dept-detail/contacts/contacts.component';
import { DeptDetailComponent } from './test/dept-detail/dept-detail.component';
import { OverviewComponent } from './test/dept-detail/overview/overview.component';
import { DeptListComponent } from './test/dept-list/dept-list.component';
import { EmpComponent } from './test/emp/emp.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'special', component: SuccessComponent, canActivate: [AuthGuard]},
  { path: 'reg', component: RegComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'test', component: TestComponent },
  { path: 'test/departments', component: DeptListComponent },
  //added a route with placeholder id parameter, which will be change according to click
  { 
    path: 'test/departments/:id', 
    component: DeptDetailComponent,
    children: [ //Adding child routes
      {path: 'overview', component: OverviewComponent},
      {path: 'contacts', component: ContactsComponent}
    ]
  },
  { path: 'test/employees', component: EmpComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
