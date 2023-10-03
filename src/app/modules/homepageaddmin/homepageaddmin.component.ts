import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepageaddmin',
  templateUrl: './homepageaddmin.component.html',
  styleUrls: ['./homepageaddmin.component.scss']
})
export class HomepageaddminComponent implements OnInit {
  constructor(
    private callserviceService: CallserviceService,
    private router: Router

  ) { }

  countUser: any = 0;
  dropdownIdCountUser : any;
  countApprove: any = 0;
  dropdownIdCountApprove : any;
  ngOnInit(): void {
    this.getCountUser();
    this.getCountApprove();
  }

  getCountUser(){
    this.callserviceService.getDropdown('COUNTUSER','1').subscribe(res => {
      console.log('res =>', res)
      if (res) {
        this.countUser = res.value1;
        this.dropdownIdCountUser = res.id;
      }
    });
  }

  getCountApprove(){
    this.callserviceService.getDropdown('COUNTAPPROVE','1').subscribe(res => {
      console.log('res =>', res)
      if (res) {
        this.countApprove = res.value1;
        this.dropdownIdCountApprove = res.id;
        
      }
    });
  }
  gotoUserdetail(){
    this.callserviceService.updeleteDropdownValue('0',this.dropdownIdCountUser).subscribe(res => {
      this.router.navigate(['home/userdetail']);
    });
  }

  gotoApprove(){
    this.callserviceService.updeleteDropdownValue('0',this.dropdownIdCountApprove).subscribe(res => {
      this.router.navigate(['home/approvebooking']);
    });
  }
  
}
