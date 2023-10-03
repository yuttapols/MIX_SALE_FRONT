import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { carModel } from '../model/car';

@Component({
  selector: 'app-carmanagement',
  templateUrl: './carmanagement.component.html',
  styleUrls: ['./carmanagement.component.scss']
})
export class CarmanagementComponent implements OnInit {

  constructor(
    private callserviceService: CallserviceService,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  carId: any
  imageBase64: any;
  imageBase64s: any[] = [];
  files: File[] = [];
  isSubmit: boolean = false;
  loading: boolean = false;

  @ViewChild('fileInput', { static: false })
  myFileInput: ElementRef;

  carForm = this.formBuilder.group({
    carId: '',
    carBrand: ['', Validators.required],
    carModel: ['', Validators.required],
    carPrice: ['', Validators.required],
    carGear: ['', Validators.required],
    carMiles: ['', Validators.required],
    carOil: ['', Validators.required],
    carYear: ['', Validators.required],
    carImageId: '',
    status: '1',
  });
  ngOnInit(): void {
    this.carId = this.activated.snapshot.paramMap.get("carId");
    console.log(this.carId, typeof this.carId);
    if (this.carId != "null") {
      this.initWorksDataforEdit(this.carId)
    }
  }
  initWorksDataforEdit(carId: any) {
    this.loading = true;
    this.callserviceService.getCarById(carId).subscribe((res) => {
      this.loading = false;
      console.log('res =>', res)
      if (res) {
        this.carForm.patchValue({
          carId: res.data.carId,
          carBrand: res.data.carBrand,
          carModel: res.data.carModel,
          carPrice: res.data.carPrice,
          carGear: res.data.carGear,
          carMiles: res.data.carMiles,
          carOil: res.data.carOil,
          carYear: res.data.carYear,
          carImageId: res.data.carImageId
        });
        this.imageBase64s = res.data.images;
        this.files = [];
      }
    });
  }
  onSubmit() {
    this.isSubmit = true;
    console.log(this.carForm);
    const carModel = this.carForm.value;

    console.log(carModel)
    if (this.validator()) {
      // workDto.workId = 0
      // workDto.svcId = 0  ห้ามใส่อย่าลืม
      Swal.fire({
        title: 'ต้องการบันทึก?',
        text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596',
        cancelButtonColor: '#d33',
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.callserviceService.saveOrupdeleteCar(carModel).subscribe(res => {
            this.loading = false;
            // this.carDetailId = res.data;
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'บันทึก!',
              text: 'บันทึกข้อมูลสำเสร็จ',
              confirmButtonText: 'ตกลง',
            });
            this.carId = res.data.carId;
            this.initWorksDataforEdit(res.data.carId);
          });

        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกไม่สำเร็จ!',
        text: 'กรุณากรอกข้อมูลให้ครบ',
        confirmButtonText: 'ตกลง',
      });
    }

  }
  validator() {
    if (this.carForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.router.navigate(['home/car']);
  }


  //set fileupload to files and reader to from
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.files.push(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.imageBase64 = reader.result;
      };

    }
  }

  // upload img
  onUploadImg() {
    // const imageBase64 = document.getElementById('imageBase64');
    // console.log(imageBase64);
    this.myFileInput.nativeElement.value = null;
    for (let i = 0; i < this.files.length; i++) {
      const formData = new FormData();
      formData.append("files", this.files[i]);
      formData.append("carId", this.carId);
      this.loading = true;
      this.callserviceService.uploadFileCar(formData).subscribe(res => {
        this.loading = false;
        this.imageBase64 = null;
        this.initWorksDataforEdit(this.carId);
      });

    }

  }

  onDeleteImg(carImageId: any) {
    this.loading  = true;
    this.callserviceService.deleteImage(carImageId).subscribe(res => {
      this.loading = false;
      this.initWorksDataforEdit(this.carId);
    });
  }
}
