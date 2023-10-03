import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallserviceService } from '../services/callservice.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private callserviceService: CallserviceService,
    private router: Router,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) { }
  paymentBank: any = [];
  bank: any;
  carId: any;
  reserveId: any;
  payId: any;
  userId: any;
  bankId: any = null;

  imageBase64: any;
  files: File[] = [];
  loading: boolean = false;

  ngOnInit(): void {

    this.onLoad();
  }


  onLoad() {
    this.userId = sessionStorage.getItem('user_id');
    this.carId = this.activated.snapshot.paramMap.get("carId");
    this.reserveId = this.activated.snapshot.paramMap.get("reserveId");

    this.callserviceService.getBankAll().subscribe(res => {
      console.log('res =>', res)
      if (res) {
        this.paymentBank = res.data;
      }
    });
  }

  getBankById(bankId: any) {
    this.bankId = bankId;
    this.callserviceService.getBankById(bankId).subscribe(res => {
      console.log('res =>', res)
      if (res) {
        this.bank = res.data;
      }
    });
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


  payment() {
    if ('null' == this.reserveId) {
      this.paymentNew();
    } else {
      this.paymentUpdate();
    }
  }

  paymentNew() {
    //จองตรั่งแรก
    if (null != this.files && this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        const formData = new FormData();
        formData.append("files", this.files[i]);
        formData.append("bankId", this.bankId);

        //upload img payment
        this.loading = true;
        this.callserviceService.uploadFilePayment(formData).subscribe(res => {

          const paymentForm = this.formBuilder.group({
            carId: this.carId,
            userId: this.userId,
            recordStatus: '1',
            payId: res.data.payId
          });
          console.log(this.carId);

          //จอง

          this.callserviceService.saveReserve(paymentForm.value).subscribe(res => {

            //update status car

            this.callserviceService.updateCarStatus(this.carId, '2').subscribe(res => {
              this.loading = false;
              Swal.fire({
                icon: 'success',
                title: 'บันทึก!',
                text: 'บันทึกข้อมูลสำเสร็จ',
                confirmButtonText: 'ตกลง',
              });
              this.router.navigate(['home/reservedetail']);

            })
          })

        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ชำระไม่สำเร็จ!',
        text: 'กรุณาแนนรูปการชำระเงินใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });

    }
  }

  paymentUpdate() {
    if (null != this.files && this.files.length > 0) {
      this.loading = true;
      this.callserviceService.getReserveById(this.reserveId).subscribe(res => {


        this.payId = res.data.payId;
        for (let i = 0; i < this.files.length; i++) {
          const formData = new FormData();
          formData.append("files", this.files[i]);
          formData.append("bankId", this.bankId);
          formData.append("payId", this.payId);
          //upload img payment

          this.callserviceService.uploadFilePayment(formData).subscribe(res => {
            //จอง

            this.callserviceService.updeleteStatusReserve('1', this.reserveId).subscribe(res => {
              this.loading = false;
              Swal.fire({
                icon: 'success',
                title: 'บันทึก!',
                text: 'บันทึกข้อมูลสำเสร็จ',
                confirmButtonText: 'ตกลง',
              });
              this.router.navigate(['home/reservedetail']);
            })

          });
        }

      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'ชำระไม่สำเร็จ!',
        text: 'กรุณาแนนรูปการชำระเงินใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });

    }


  }


}
