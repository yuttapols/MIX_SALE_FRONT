import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { ActivatedRoute, Route, RouteReuseStrategy, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  constructor(
    private callserviceService: CallserviceService,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router

  ) { }

  userId: any;
  user: any = {};
  provinces: any = [];
  amphures: any = [];
  tambons: any = [];
  userName: any = '';
  isSubmit: boolean = false;
  loading: boolean = false

  userInFoForm = this.formBuilder.group({
    userdeId: '',
    userId: '',
    roleId: '3',
    username: '',
    password: '',
    recordStatus: '1',

    fristName: ['', Validators.required],
    lastName: ['', Validators.required],
    userAddress: ['', Validators.required],
    tambonsId: '',
    tambonsName: ['', Validators.required],
    amphureId: '',
    amphureName: ['', Validators.required],
    provinceId: '',
    provinceName: ['', Validators.required],
    userPhone: ['', Validators.required],
    userEmail: ['', Validators.required],
    zipCode: '',


  });

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('user_id');
    this.onLoad();
  }


  async editUserinFo(userId: any) {
    this.loading = true;
    await this.callserviceService.getUserDetailByUserId(userId).toPromise().then(res => {
      this.loading = false;
      console.log('res=>', res)
      if (res) {
        this.userInFoForm.patchValue({
          userdeId: res.data.userdeId,
          userId: res.data.userId,
          roleId: res.data.roleId,
          username: res.data.username,
          password: res.data.password,
          recordStatus: res.data.recordStatus,
          fristName: res.data.fristName,
          lastName: res.data.lastName,
          userAddress: res.data.userAddress,
          tambonsId: res.data.tambonsId,
          tambonsName: res.data.tambonsName,
          amphureId: res.data.amphureId,
          amphureName: res.data.amphureName,
          provinceId: res.data.provinceId,
          provinceName: res.data.provinceName,
          userPhone: res.data.userPhone,
          userEmail: res.data.userEmail,
          zipCode: res.data.zipCode,

        });
        this.user = res.data;
      }
    });
  }
  async onLoad() {
    this.callserviceService.getThaiProvincesAll().subscribe(res => {
      this.provinces = res.data;
    });
    await this.editUserinFo(this.userId);

    this.callserviceService.getThaiAmphuresAllByProvinceId(this.userInFoForm.value.provinceId).subscribe(res => {
      this.amphures = res.data;
    });

    this.callserviceService.getThaiTambonsAllByAmphuresId(this.userInFoForm.value.amphureId).subscribe(res => {
      console.log(res)
      this.tambons = res.data;
    });

    this.callserviceService.getThaiTambonsById(this.userInFoForm.value.tambonsId).toPromise().then(res => {
      console.log(res)
      this.userInFoForm.controls.zipCode.setValue(res.data.zipCode);
    });

    this.callserviceService.getUserById(this.userId).toPromise().then(res => {
      console.log(res)
      this.userName = res.data.username;
    });
  }

  onChangeProvinces() {
    console.log(this.userInFoForm);
    this.userInFoForm.controls.amphureId.setValue('');
    this.userInFoForm.controls.tambonsId.setValue('');
    this.userInFoForm.controls.zipCode.setValue('')
    this.getThaiAmphuresAllByProvinceId(this.userInFoForm.value.provinceId);
  }

  getThaiAmphuresAllByProvinceId(provinceId: any) {
    this.callserviceService.getThaiAmphuresAllByProvinceId(provinceId).subscribe(res => {
      this.amphures = res.data;
    });
  }

  onChangeAmphures() {
    this.userInFoForm.controls.tambonsId.setValue('');
    this.userInFoForm.controls.zipCode.setValue('');
    this.getThaiTambonsAllByAmphuresId(this.userInFoForm.value.amphureId);
  }

  getThaiTambonsAllByAmphuresId(amphureId: any) {
    console.log(amphureId)
    this.callserviceService.getThaiTambonsAllByAmphuresId(amphureId).subscribe(res => {
      console.log(res)
      this.tambons = res.data;
    });
  }

  onChangeTombons() {
    console.log(this.userInFoForm.value)
    this.getThaiTambonsById(this.userInFoForm.value.tambonsId);
  }

  getThaiTambonsById(tambonsId: any) {
    this.callserviceService.getThaiTambonsById(tambonsId).toPromise().then(res => {
      console.log(res)
      this.userInFoForm.controls.zipCode.setValue(res.data.zipCode);
    });

  }

  onSubmit() {

    this.isSubmit = true;
    console.log(this.userInFoForm)
    const userinFo = this.userInFoForm.value;

    console.log(userinFo)
    if (this.validator()) {
      Swal.fire({
        title: 'ต้องการแก้ไขข้อมูลส่วนตัว?',
        text: "คุณต้องการแก้ไขข้อมูลส่วนตัวใช่หรือไม่!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596',
        cancelButtonColor: '#d33',
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.callserviceService.updeleteUserDetail(userinFo).subscribe(res => {
            this.loading = false;
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'บันทึก!',
              text: 'บันทึกข้อมูลสำเสร็จ',
              confirmButtonText: 'ตกลง',
            });
            this.router.navigate(['home/homepage']);
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขข้อมูลไม่สำเร็จ!',
        text: 'กรุณากรอกข้อมูลให้ครบ',
        confirmButtonText: 'ตกลง',
      });

    }
  }
  goBack() {
    this.router.navigate(['home/homepage']);
  }

  validator() {
    if (this.userInFoForm.valid) {
      return true;
    } else {
      return false;
    }
  }

}
