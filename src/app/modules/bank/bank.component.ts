import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  constructor(
    private callserviceService: CallserviceService,
    private router: Router
  ) { }

  listBank: any
  loading: boolean =false;

  ngOnInit(): void {
    this.loading = true;
    this.callserviceService.getBankAll().subscribe(res => {
      this.loading = false;
      console.log('res=>', res)
      if (res) {
        this.listBank = res.data;
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
        this.callserviceService.deleteBank(Number(item.bkId)).subscribe(res => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'ลบแล้ว!',
            text: 'ไฟล์ของคุณถูกลบแล้ว',
            confirmButtonText: 'ตกลง',
          });
          // window.location.reload()
          this.ngOnInit()
        });
      }
    })
  }

  onGetId(item: any) {
    this.router.navigate(['home/bankmanagement/' + item.bkId]);

  }
  onInsertBank() {
    this.router.navigate(['home/bankmanagement/null']);

  }
}
