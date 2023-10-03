import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  constructor(private callserviceService: CallserviceService,
    private activated: ActivatedRoute
  ) { }

  listUserDetail: any
  userId: any;
  loading: boolean = false;

  ngOnInit(): void {
    this.userByRolr();
  }
  userByRolr() {
    this.loading = true;
    this.callserviceService.getUserByRoleId(3).subscribe(res => {
      this.loading = false;
      console.log('res', res)
      this.listUserDetail = res.data;
    });
  }

  onDelete(item: any) {

    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: 'คุณต้องการลบข้อมูลรถยนต์นี้ใช่หรือไม่!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่ ลบเลย!',
      cancelButtonText: 'ยกเลิก'

    }).then((result) => {
      if (result.isConfirmed)
      this.loading = true;
        this.callserviceService.deleteUser(Number(item.userId)).subscribe(res => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'ลบข้อมูล!',
            text: 'ลบข้อมูลสำเสร็จ',
            confirmButtonText: 'ตกลง',
          });
          this.ngOnInit()
        });
    })
  }

}
