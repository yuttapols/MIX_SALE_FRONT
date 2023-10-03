import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {



  constructor(
    private callserviceService: CallserviceService,
    private router: Router

  ) { }

  listReserve: any
  reserveId: any
  loading: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this.callserviceService.getReserveAll().subscribe(res => {
      this.loading = false;
      console.log('res =>', res)
      if (res) {
        this.listReserve = res.data;

      }
    });
  }

  //  onGetReserveById(item: any) {
  //   this.router.navigate(['home/approvebookingmanagement/' + item.reserveId]);

  // }

  reportExcel() {
    window.open('http://localhost:9080/it-rmu-api/genexcel/download', "_blank")
  }

  reportPDF() {
    window.open('http://localhost:9080/it-rmu-api/genepdf/download', "_blank")
  }

}


