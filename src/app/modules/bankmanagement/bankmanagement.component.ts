import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bankmanagement',
  templateUrl: './bankmanagement.component.html',
  styleUrls: ['./bankmanagement.component.scss']
})
export class BankmanagementComponent implements OnInit {

  constructor(
    private callseriveService: CallserviceService,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  bkId: any;
  imageBase64: any;
  files: File[] = [];
  isSubmit: boolean = false;
  isQrCode: boolean = false;
  loading: boolean = false;

  bkForm = this.formBuilder.group({
    bkId: '',
    bankNmae: ['', Validators.required],
    bkAccountNumber: ['', Validators.required],
    name: ['', Validators.required],
    qrCode: '',

  });

  ngOnInit(): void {
    this.bkId = this.activated.snapshot.paramMap.get("bkId");
    // คือการเช็ค if = '' ไหม

    if (this.bkId != "null") {
      this.initWorksDataforEdit(this.bkId)
    }


  }
  initWorksDataforEdit(bkId: any) {
    this.loading = true;
    this.callseriveService.getBankById(bkId).subscribe((res) => {
      this.loading = false;
      console.log('res=>', res)
      if (res) {
        this.bkForm.patchValue({
          bkId: res.data.bkId,
          bankNmae: res.data.bankNmae,
          bkAccountNumber: res.data.bkAccountNumber,
          name: res.data.name,
          qrCode: res.data.qrCode

        })
        // console.log(this.bkForm);
        this.imageBase64 = res.data.qrCode;
      }

    });
  }
  onSubmit() {
    this.isSubmit = true;
    console.log(this.bkForm);

    const editBankModel = this.bkForm.value;

    console.log(editBankModel);
    if (this.validetor()) {
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
          this.callseriveService.saveOrupdeleteBank(editBankModel).subscribe(res => {
            this.loading = false;
            // this.carDetailId = res.data;
            // Swal.fire(
            //   'บันทึก!',
            //   'บันทึกข้อมูลสำเสร็จ',
            //   'success'
            // )
            this.onUploadImg(res.data.bkId);

          });

        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกไม่สำเร็จ!',
        text: 'กรุณากรอกข้อมูลให้ครบ',
        confirmButtonText: 'ตกลง',
      });
    }
  }

  validetor() {
    if (this.bkForm.valid) {

      console.log(this.files.length)
      if (this.files.length > 0) {

        return true;
      } else {
        this.isQrCode = true;
        return false;
      }

    } else {
      return false;
    }
  }


  goBack() {
    this.router.navigate(['home/bank']);
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
  onUploadImg(bankId: any) {
    for (let i = 0; i < this.files.length; i++) {
      const formData = new FormData();
      formData.append("files", this.files[i]);
      formData.append("bankId", bankId);
      this.loading = true;
      this.callseriveService.uploadFileBank(formData).subscribe(res => {
        this.loading = false;
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'บันทึก!',
          text: 'บันทึกข้อมูลสำเสร็จ',
          confirmButtonText: 'ตกลง',
        });
      });
    }

    this.router.navigate(['home/bank']);
  }


}
