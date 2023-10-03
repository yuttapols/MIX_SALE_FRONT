import { Component } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-bookinginformation',
  templateUrl: './bookinginformation.component.html',
  styleUrls: ['./bookinginformation.component.scss']
})
export class BookinginformationComponent {
  constructor(
    private callserviceService: CallserviceService,
    private router: Router

  ) { }

  listReserve: any
  reserveId: any
  loading: boolean = false;

  ngOnInit(): void {
    this.onLoad();

  }

  onLoad() {
    this.loading = true;
    this.callserviceService.getReserveAllByStauts('2').subscribe(res => {
      this.loading = false;
      console.log('res =>', res)
      if (res) {
        this.listReserve = res.data;

      }
    });
  }

  onSubmit(reserveId: any, carId: any) {
    Swal.fire({
      title: 'ยืนยันการซื้อขาย?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#56C596',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.callserviceService.updateReserveStatus(reserveId, '6').subscribe(res => {
          this.callserviceService.updateCarStatus(carId, '3').subscribe(res => {
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: 'สำเร็จ!',
              text: "การซื้อขายเสร็จสิ้น",

              confirmButtonText: 'ตกลง',
            });
            this.onLoad();

          });
        });
      }
    });
  }

}
