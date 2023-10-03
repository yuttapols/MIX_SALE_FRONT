import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkinformation',
  templateUrl: './checkinformation.component.html',
  styleUrls: ['./checkinformation.component.scss']
})
export class CheckinformationComponent implements OnInit {

  constructor(
    private callserviceService: CallserviceService,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.onLoad();
  }

  user: any = {};
  car: any = {};
  carId: any;
  images: any;
  reserveId: any;
  loading: boolean = false;

  onLoad() {
    this.carId = this.activated.snapshot.paramMap.get("carId");
    this.getUser();
    this.getCar();

  }

  getUser() {
    const userId = sessionStorage.getItem('user_id');
    this.loading = true;
    this.callserviceService.getUserDetailByUserId(userId).subscribe((res) => {
      this.loading = false;
      console.log('res =>', res)
      if (res) {
        this.user = res.data;
      }
    });
  }

  getCar() {
    this.loading = true;
    this.callserviceService.getCarById(this.carId).subscribe((res) => {
      this.loading = false;
      console.log('res =>', res)
      if (res) {
        this.car = res.data;
        this.images = res.data.images;
      }
    });
  }
  goPayment() {
    console.log(this.carId);
    this.router.navigate(['home/payment/' + this.carId + '/' + null]);
  }

  // save(){
  //   const paymentForm = this.formBuilder.group({
  //     carId: this.car.carId,
  //     userId: this.user.userId,
  //     recordStatus : '5'
  //   });
  //   console.log(this.carId);
  //   this.callserviceService.saveReserve(paymentForm.value).subscribe(res =>{
  //     console.log(res);
  //     this.reserveId = res.data.reserveId;
  //     this.router.navigate(['home/payment/' + this.reserveId]);
  //   })
  // }

  goBack() {
    console.log(this.carId);
    this.router.navigate(['home/cardetail/' + this.carId]);
  }
}
