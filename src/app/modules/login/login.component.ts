import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CallserviceService } from '../services/callservice.service';
import { Router } from '@angular/router';

import { LoginModel } from '../model/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });



  constructor(private formBuilder: FormBuilder,
    private callserviceService: CallserviceService,
    private router: Router,) { }



  ngOnInit(): void {

  }
  onSubmit() {
    const userDTO: LoginModel = this.loginForm.value as LoginModel;

    sessionStorage.removeItem('user_role')

    this.callserviceService.getUsernamePassword(userDTO.username, userDTO.password).subscribe((res) => {
      console.log(res)
      if (res) {
        sessionStorage.removeItem('user_role');
        sessionStorage.removeItem('user_id');
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          confirmButtonText: 'ตกลง',
        });

        // sessionStorage.setItem('user_role',res.roleNo)
        sessionStorage.setItem('user_id', res.userId)
        if (res.roleNo == 2) {
          sessionStorage.setItem('user_role', 'user')
          this.router.navigate(['home/homepage']).then(() => {
            window.location.reload()
          });
        } else if (res.roleNo == 1) {
          sessionStorage.setItem('user_role', 'admin')
          this.router.navigate(['home/homepageaddmin']).then(() => {
            window.location.reload()
          });
        } else {

        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'ไม่สามารถเข้าสู่ระบบได้!',
          text: 'กรุณาตรวจสอบใหม่อีกครั้ง',
          confirmButtonText: 'ตกลง',
        });


      }



      this.ngOnInit();
    });
  }

}


