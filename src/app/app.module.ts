import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegComponent } from './reg/reg.component';
import { CarService } from './services/car.service';
import {HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DeptListComponent } from './test/dept-list/dept-list.component';
import { DeptDetailComponent } from './test/dept-detail/dept-detail.component';
import { EmpComponent } from './test/emp/emp.component'
import { RegService } from './services/reg.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { SuccessComponent } from './login/success/success.component';
import { AuthGuard } from './login/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './login/profile/profile.component';
import { OverviewComponent } from './test/dept-detail/overview/overview.component';
import { ContactsComponent } from './test/dept-detail/contacts/contacts.component';
import {DisableDragDropDirective} from './directives/disable-drag-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    RegComponent,
    PageNotFoundComponent,
    DeptListComponent,
    DeptDetailComponent,
    EmpComponent,
    SuccessComponent,
    HomeComponent,
    ProfileComponent,
    OverviewComponent,
    ContactsComponent,
    DisableDragDropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CarService,
    RegService,
    UserService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
