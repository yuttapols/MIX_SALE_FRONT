import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { UserinfoComponent } from '../userinfo/userinfo.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { HompageComponent } from '../hompage/hompage.component';
import { ReservedetailComponent } from '../reservedetail/reservedetail.component';
import { HomepageaddminComponent } from '../homepageaddmin/homepageaddmin.component';
import { ApprovebookingComponent } from '../approvebooking/approvebooking.component';
import { CarComponent } from '../car/car.component';
import { UserdetailComponent } from '../userdetail/userdetail.component';
import { ReportComponent } from '../report/report.component';
import { BankComponent } from '../bank/bank.component';
import { BankmanagementComponent } from '../bankmanagement/bankmanagement.component';
import { CardetailComponent } from '../cardetail/cardetail.component';
import { CheckinformationComponent } from '../checkinformation/checkinformation.component';
import { PaymentComponent } from '../payment/payment.component';
import { MainpageComponent } from '../mainpage/mainpage.component';
import { SlippaymentComponent } from '../slippayment/slippayment.component';
import { CarmanagementComponent } from '../carmanagement/carmanagement.component';
import { ApprovebookingmanagementComponent } from '../approvebookingmanagement/approvebookingmanagement.component';
import { ReportgenexcelComponent } from '../reportgenexcel/reportgenexcel.component';
import { BookinginformationComponent } from '../bookinginformation/bookinginformation.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '', redirectTo: '',
        pathMatch: 'full'
      },
      
      // หน้าแรกของ เว็ปการสั่งจองรถยนต์มือองออนไลน์ /////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        path: 'mainpage',
        component: MainpageComponent
      },
      // หน้า เข้าสู่ะบบ
      {
        path: 'login',
        component: LoginComponent
      },
      // หน้า สมัครสมาชิก
      {
        path: 'register',
        component: RegisterComponent
      },
      // หน้า รีเซ็ตรหัสผ่าน
      {
        path: 'resetpassword',
        component: ResetpasswordComponent
      },


      //////////////////////////////  หน้าของผู้ใช้งาน ////////////////////////////////////
      // หน้า ข้อมูลผู้ใช้งาน
      {
        path: 'userinfo',
        component: UserinfoComponent
      },
      // หน้า เปลี่ยนหรัสผ่าน
      {
        path: 'changepassword',
        component: ChangepasswordComponent
      },
      // หน้า หน้าแรกของผู้ใช้งาน
      {
        path: 'homepage',
        component: HompageComponent
      },
      // หน้า ข้อมูลรถยนต์ของผู้ใช้งาน
      {
        path: 'cardetail/:carId',
        component: CardetailComponent
      },
      // หน้า เช้คของมูงการสั่งจองของผู้ใช้งาน
      {
        path: 'checkinformation/:carId',
        component: CheckinformationComponent
      },
      // หน้า การชำระเงินของผู้ใช้งาน
      {
        path: 'payment/:carId/:reserveId',
        component: PaymentComponent
      },
      // หน้า แนบสลิปการชำระเงินของผู้ใช้งาน
      {
        path: 'slippayment',
        component: SlippaymentComponent
      },
      // หน้า รายละเอียดการสั่งจอง
      {
        path: 'reservedetail',
        component: ReservedetailComponent
      },


      ///////////////////////////////  หน้าของแอดมิน ///////////////////////
      {
        path: 'homepageaddmin',
        component: HomepageaddminComponent
      },
      // หน้า ของข้อมูลผู้ใช้งาน
      {
        path: 'userdetail',
        component: UserdetailComponent
      },
      // หน้า ของข้อมูลรถยนต์
      {
        path: 'car',
        component: CarComponent
      },
      // หน้า ของการแก้ไขและอัพเดทข้อมูลของรถยนต์
      {
        // การต่อ phat
        path: 'carmanagement/:carId',
        component: CarmanagementComponent
      },
      // หน้า อนุมัติการสั้งจอง
      {
        path: 'approvebooking',
        component: ApprovebookingComponent
      },
      // หน้า ยืนยันการอนุมัติการสั่งจอง
      {
        path: 'approvebookingmanagement/:reserveId',
        component: ApprovebookingmanagementComponent
      },
      {
        path: 'bookinginformation',
        component: BookinginformationComponent
      },
      // ห้นา ข้อมูลของธนาคาร
      {
        path: 'bank',
        component: BankComponent
      },
      // หน้า การแก้ไขและอัพเดทข้อมูลของธนาคาร
      {
        path: 'bankmanagement/:bkId',
        component: BankmanagementComponent
      },
      // หน้า รายการรายงานผลการสั่งจอง
      {
        path: 'report',
        component: ReportComponent
      },
      {
        path: 'reportgenexcel',
        component: ReportgenexcelComponent
      }
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
