import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CallserviceService } from '../services/callservice.service';
import { ChangePasswordModel } from '../model/changePassword';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  changePasswordForm = this.formBuilder.group({
    email: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
    private callserviceService: CallserviceService,
    private router: Router

  ) { }

  loading: boolean = false;
  isSubmit: boolean = false;
  ngOnInit(): void {

  }
  onSubmit() {
    this.isSubmit = true;
    console.log(this.changePasswordForm);
    if (this.validator()) {
      const changePassword: ChangePasswordModel = this.changePasswordForm.value as ChangePasswordModel;
      Swal.fire({
        title: 'ต้องการรีเซ็ต?',
        text: "คุณต้องการรีเซ็ตรหัสผ่านใช่หรือไม่!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596',
        cancelButtonColor: '#d33',
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.callserviceService.getResetPassWord(changePassword.email).subscribe((res) => {
            this.loading = false;
            console.log(res)
            Swal.fire({
              icon: 'success',
              title: 'รีเซ็ต!',
              text: 'รหัสผ่านของคุณรีเซ็ตแล้ว โปรดตรวจสอบผ่านทาง E-mail',
              confirmButtonText: 'ตกลง',
            });
            this.router.navigate(['home/login']);
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'รีเซ็ตรหัสผ่านไม่สำเร็จ!',
        text: 'กรุณากรอกข้อมูลใหม่อีกรอบ',
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
