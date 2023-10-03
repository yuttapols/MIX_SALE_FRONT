import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private callserviceService: CallserviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activated: ActivatedRoute
  ) { }

  userId: any;
  provinces: any = [];
  amphures: any = [];
  tambons: any = [];
  zipCode: string = '';
  isSubmit: boolean = false;
  isPassword: boolean = false;
  loading: boolean = false;

  registerForm = this.formBuilder.group({

    userdeId: '',
    userId: '',
    roleId: '3',
    username: '',
    password: '',
    recordStatus: '1',
    fristName: '',
    lastName: '',
    userAddress: '',
    tambonsId: '',
    userPhone: '',
    userEmail: '',
    provincesId: '',
    amphuresId: '',
    configpassword: '',

  })

  ngOnInit(): void {
    this.onLoad();
  }
  onLoad() {
    this.callserviceService.getThaiProvincesAll().subscribe(res => {
      this.provinces = res.data;
    });
  }


  onChangeProvinces() {
    this.zipCode = '';
    this.getThaiAmphuresAllByProvinceId(this.registerForm.value.provincesId);
  }

  getThaiAmphuresAllByProvinceId(provinceId: any) {
    this.callserviceService.getThaiAmphuresAllByProvinceId(provinceId).subscribe(res => {
      this.amphures = res.data;
    });
  }

  onChangeAmphures() {
    this.zipCode = '';
    this.getThaiTambonsAllByAmphuresId(this.registerForm.value.amphuresId);
  }

  getThaiTambonsAllByAmphuresId(amphuresId: any) {
    console.log(amphuresId)
    this.callserviceService.getThaiTambonsAllByAmphuresId(amphuresId).subscribe(res => {
      console.log(res)
      this.tambons = res.data;
    });
  }

  onChangeTombons() {
    this.zipCode = '';
    this.getThaiTambonsById(this.registerForm.value.tambonsId);
  }

  getThaiTambonsById(tambonsId: any) {
    this.callserviceService.getThaiTambonsById(tambonsId).subscribe(res => {
      console.log(res)
      this.zipCode = res.data.zipCode;
    });

  }


  onSubmit() {
    this.isSubmit = true;
    console.log(this.registerForm)
    if (this.validator()) {
      const reguster = this.registerForm.value;
      Swal.fire({
        title: 'ต้องการสมัครสมาชิก?',
        text: "คุณต้องการสมัครสมาชิกใช่หรือไม่!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596',
        cancelButtonColor: '#d33',
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.callserviceService.saveRegister(reguster).subscribe(res => {
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: 'สำเร็จ!',
              text: 'สมัครสมาชิกสำเร็จ โปรดตรวจสอบ E-mail',
              confirmButtonText: 'ตกลง',
            });
            this.router.navigate(['home/login']);
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'สมัครสมาชิกไม่สำเร็จ!',
        text: 'กรุณากรอกข้อมูลให้ครบ',
        confirmButtonText: 'ตกลง',
      });
    }
  }

  validator() {
    const password = this.registerForm.value.password;
    const passwordCon = this.registerForm.value.configpassword;

    if (password != passwordCon) {
      this.isPassword = true;
      return false;
    }
    if (this.registerForm.valid) {
      return true;
    } else {
      return false;
    }
  }
}
