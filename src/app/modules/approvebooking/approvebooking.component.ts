import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approvebooking',
  templateUrl: './approvebooking.component.html',
  styleUrls: ['./approvebooking.component.scss']
})
export class ApprovebookingComponent implements OnInit {
  constructor(
    private callserviceService: CallserviceService,
    private router: Router

  ) { }

  listReserve: any
  reserveId: any
  loading: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this.callserviceService.getReserveAllByStauts('1').subscribe(res => {
      this.loading = false;
      console.log('res =>', res)
      if (res) {
        this.listReserve = res.data;

      }
    });
  }

  onGetReserveById(item: any) {
    this.router.navigate(['home/approvebookingmanagement/' + item.reserveId]);

  }
  // approveBookingCar() {
  //   this.callserviceService.updeleteStatusReserve('2', this.reserveId).subscribe((res) => {

  //   });
  // }

}
