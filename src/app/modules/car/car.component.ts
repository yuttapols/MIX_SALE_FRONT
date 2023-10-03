import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  constructor(private callserviceService: CallserviceService,
    private router: Router
  ) { }

  listCar: any
  loading: boolean = false;
  // getAll getข้อมูลออกมาทั้งหมด
  ngOnInit(): void {

    // ถ้ามี res มา ให้ .date หลัง res
    this.loading = true;
    this.callserviceService.getCarAll().subscribe(res => {
      this.loading = false;
      if (res) {
        this.listCar = res.data;

      }
    });
  }

  onDelete(item: any) {
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: 'คุณต้องการลบข้อมูลรถยนต์นี้ใช่หรือไม่!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่ ลบเลย!',
      cancelButtonText: 'ยกเลิก'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.callserviceService.deleteCar(Number(item.carId)).subscribe(res => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'ลบแล้ว!',
            text: 'ไฟล์ของคุณถูกลบแล้ว',
            confirmButtonText: 'ตกลง',
          });
          this.ngOnInit()
        });
      }
    })
  }

  onGetId(item: any) {
    this.router.navigate(['home/carmanagement/' + item.carId]);

  }

  onInsertCar() {
    this.router.navigate(['home/carmanagement/null']);

  }
}
