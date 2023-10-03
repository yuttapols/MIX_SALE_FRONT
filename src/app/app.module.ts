import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarComponent } from './modules/car/car.component';
import { UserComponent } from './modules/user/user.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { ResetpasswordComponent } from './modules/resetpassword/resetpassword.component';
import { UserinfoComponent } from './modules/userinfo/userinfo.component';
import { ChangepasswordComponent } from './modules/changepassword/changepassword.component';
import { HompageComponent } from './modules/hompage/hompage.component';
import { ReservedetailComponent } from './modules/reservedetail/reservedetail.component';
import { HomepageaddminComponent } from './modules/homepageaddmin/homepageaddmin.component';
import { ApprovebookingComponent } from './modules/approvebooking/approvebooking.component';
import { UserdetailComponent } from './modules/userdetail/userdetail.component';
import { ReportComponent } from './modules/report/report.component';
import { BankComponent } from './modules/bank/bank.component';
import { CarmanagementComponent } from './modules/carmanagement/carmanagement.component';
import { BankmanagementComponent } from './modules/bankmanagement/bankmanagement.component';
import { ApprovebookingmanagementComponent } from './modules/approvebookingmanagement/approvebookingmanagement.component';
// import { EnvironmentsComponent } from './environments/environments.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardetailComponent } from './modules/cardetail/cardetail.component';
import { PaymentComponent } from './modules/payment/payment.component';

import { MainpageComponent } from './modules/mainpage/mainpage.component';
import { SlippaymentComponent } from './modules/slippayment/slippayment.component';
import { ReportgenexcelComponent } from './modules/reportgenexcel/reportgenexcel.component';
import { CheckinformationComponent } from './modules/checkinformation/checkinformation.component';
import { BookinginformationComponent } from './modules/bookinginformation/bookinginformation.component';
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    UserinfoComponent,
    ChangepasswordComponent,
    HompageComponent,
    ReservedetailComponent,
    HomepageaddminComponent,
    ApprovebookingComponent,
    UserdetailComponent,
    ReportComponent,
    BankComponent,
    CarmanagementComponent,
    BankmanagementComponent,
    ApprovebookingmanagementComponent,
    CardetailComponent,
 
    PaymentComponent,
    MainpageComponent,
    SlippaymentComponent,
    ReportgenexcelComponent,
    CheckinformationComponent,
    BookinginformationComponent



  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
