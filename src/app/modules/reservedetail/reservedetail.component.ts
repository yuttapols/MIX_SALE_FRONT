import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservedetail',
  templateUrl: './reservedetail.component.html',
  styleUrls: ['./reservedetail.component.scss']
})
export class ReservedetailComponent implements OnInit {
  constructor(
    private callserviceService: CallserviceService,
    private activated: ActivatedRoute,
    private router: Router,

  ) { }
  userId: any;
  reserveId: any;
  listReserveDetail: any;
  loading: boolean = false;

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('user_id');
    this.reserveDetail(this.userId);
  }
  reserveDetail(userId: any) {
    this.loading = true;
    this.callserviceService.getReserveByUserId(userId).subscribe((res) => {
      this.loading = false;
      console.log('res =>', res);
      if (res) {
        this.listReserveDetail = res.data;
        console.log(this.listReserveDetail);  
      }
    });
  }

  goPayment(carId: any, reserveId: any) {
    console.log(carId);
    this.router.navigate(['home/payment/' + carId + '/' + reserveId]);
  }


}
