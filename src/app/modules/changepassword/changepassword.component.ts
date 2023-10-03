import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CallserviceService } from '../services/callservice.service';
import { Router } from '@angular/router';
import { ChangePasswordModel } from '../model/changePassword';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  constructor(
    private callserviceService: CallserviceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  userId: any
  isSubmit: boolean = false;
  isPassword: boolean = false;
  loading: boolean = false;

  changePasswordForm = this.formBuilder.group({
    userId: '',
    password: ['', Validators.required],
    passwordNew: ['', Validators.required],
    passwordConfirm: ['', Validators.required],

  });

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('user_id');
    this.changePasswordForm.patchValue({
      userId: this.userId,
    });
  }

  onSubmit() {
    this.isSubmit = true;
    console.log(this.changePasswordForm)
    if (this.validator()) {
      const passwordNew = this.changePasswordForm.value;
      // workDto.workId = 0
      // workDto.svcId = 0  ห้ามใส่อย่าลืม

      Swal.fire({
        title: 'ต้องการเเก้ไขข้อมูล?',
        text: "คุณต้องการเเก้ไขข้อมูลใช่หรือไม่!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, we it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.callserviceService.changePassword(passwordNew).subscribe(res => {
            this.loading = false;
            if (res.statusCode == '0') {
              Swal.fire({
                icon: 'success',
                title: 'บันทึก!',
                text: 'บันทึกข้อมูลสำเสร็จ',
                confirmButtonText: 'ตกลง',
              });
              this.router.navigate(['home/homepage']);
            } else {
              Swal.fire(
                'กรุณาทำรายการใหม่อีกครั้ง',
                res.errorMessen,
                'error'
              )
            }

          });

        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ไม่สำเร็จ!',
        text: 'กรุณากรอกข้อมูลให้ครบ',
        confirmButtonText: 'ตกลง',
      });
    }
  }
  validator() {
    if (this.changePasswordForm.valid) {
      return true;
    } else {
      return false;
    }
  }
}


