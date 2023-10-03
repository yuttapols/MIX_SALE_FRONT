import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.scss']
})
export class HompageComponent implements OnInit {

  constructor(
    private callserviceServie: CallserviceService,
    private formbuilder: FormBuilder,
    private activated: ActivatedRoute,
    private router: Router

  ) { }
  isLogin: boolean = false;
  loading: boolean = false;
  ngOnInit(): void {
    this.onLoad();
  }

  data: any;
  carBrands: any[] = [];

  onLoad() {
    this.loading = true;
    this.callserviceServie.getCarAll().subscribe((res) => {

      if (res) {
        this.data = res.data;
      }
    });

    this.callserviceServie.getCarBrand().subscribe((res) => {
      this.loading = false;
      if (res) {
        this.carBrands = res.data;
      }
    });
  }

  gotoCarDetail(item: any) {
    this.router.navigate(['home/cardetail/' + item.carId]);

  }

  selectBrand(carBrand: any) {
    this.callserviceServie.getCarByCarBrand(carBrand).subscribe((res) => {

      if (res) {
        this.data = res.data;
      }
    });

  }

}
