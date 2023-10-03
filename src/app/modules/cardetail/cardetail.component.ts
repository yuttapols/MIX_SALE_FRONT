import { Component } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.scss']
})
export class CardetailComponent {
  carId: any;
  loading: boolean = true;
  data: any;

  constructor(
    private callserviceServie: CallserviceService,
    private activated: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.carId = this.activated.snapshot.paramMap.get("carId");
    this.onLoad(this.carId);
  }


  isLogin: boolean = false;
  images: any;

  onLoad(carId: any) {
    const userId = sessionStorage.getItem('user_id');
    if (userId != null) {
      this.isLogin = true;
    }
    this.loading = true;
    this.callserviceServie.getCarById(carId).subscribe((res) => {
      this.loading = false;

      if (res) {
        this.data = res.data;
      }
    });
  }

  goBack() {
    this.router.navigate(['home/homepage']);
  }
  goCheckinformation(item: any) {
    this.router.navigate(['home/checkinformation/' + item.carId]);
  }

  onLogin() {
    Swal.fire({
      icon: 'success',
      title: 'กรุณาเข้าสู่ระบบ!',
      confirmButtonText: 'ตกลง',
    });
    this.router.navigate(['home/login'])
  }
}
