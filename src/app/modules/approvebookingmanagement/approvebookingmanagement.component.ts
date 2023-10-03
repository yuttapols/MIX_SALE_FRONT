import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approvebookingmanagement',
  templateUrl: './approvebookingmanagement.component.html',
  styleUrls: ['./approvebookingmanagement.component.scss']
})
export class ApprovebookingmanagementComponent implements OnInit {

  constructor(
    private callserviceServie: CallserviceService,
    private activated: ActivatedRoute,
    private router: Router

  ) { }
  imageBase64: any;
  reserveId: any;
  data: any;
  loading: boolean = false;

  // reserveForm = this.formbuilder.group({
  //   reserveId: '',
  //   carId: '',
  //   userId: '',
  //   payId: '',

  //   fullName: '',
  //   userPhone: '',
  //   userEmail: '',

  //   carBrand: '',
  //   carModel: '',
  //   carPrice: '',
  //   carGear: '',
  //   carMiles: '',
  //   carOil: '',
  //   carYear: '',

  //   payImage: '',

  //   recordStatus: ''

  // });
  ngOnInit(): void {

    this.reserveId = this.activated.snapshot.paramMap.get("reserveId");
    this.initWorksDataforEdit(this.reserveId)
  }

  initWorksDataforEdit(reserveId: any) {

    this.callserviceServie.getReserveById(reserveId).subscribe((res) => {
      console.log('res =>', res)
      if (res) {
        this.data = res.data;
        this.imageBase64 = res.data.paymentResponseModel.payImage;
        console.log(this.data)
        // this.reserveForm.patchValue({
        //   reserveId: res.data.reserveId,
        //   carId: res.data.carId,
        //   userId: res.data.userId,
        //   payId: res.data.payId,
        //   fullName: res.data.fullName,
        // userPhone: res.data.userPhone,
        // userEmail: res.data.userEmail,
        // carBrand: res.data.carResponseModel.carBrand,
        // carModel: res.data.carModel,
        // carPrice: res.data.carPrice,
        // carGear: res.data.carGear,
        // carMiles: res.data.carMiles,
        // carOil: res.data.carOil,
        // carYear: res.data.carYear,
        //   // payImage: res.data.payImage
        // });
      }
    });
  }
  approveBookingCar() {
    Swal.fire({
      title: 'คุณต้องการอนุมัติการสั่งจองนี้ใช่หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#56C596',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.callserviceServie.updeleteStatusReserve('2', this.reserveId).subscribe((res) => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'ตกลง',
          });
          this.router.navigate(['home/approvebooking']);
        });
      }
    });

  }


  notApproveBookingCar() {
    Swal.fire({
      title: 'คุณต้องการไม่อนุมัติการสั่งจองนี้ใช่หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#56C596',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.callserviceServie.updeleteStatusReserve('4', this.reserveId).subscribe((res) => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'ตกลง',
          });
          this.router.navigate(['home/approvebooking']);
        });
      }
    });


  }

}
