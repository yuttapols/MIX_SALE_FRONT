import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { service } from "src/app/core/path/service-path";
import { UtilServiceService } from "src/app/core/util/util-service.service";
import { UserDTO } from "src/app/model/UserDTO";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(
    private utilService: UtilServiceService,
    private route : Router
  ) {}

  public user : UserDTO = new UserDTO();
  ngOnInit(
  ): void {
    //this.doSession();
  }



  login(){
    var rootUrl = service.login + "?username=" + this.user.username + "&password=" + this.user.password;
    this.utilService.get(rootUrl).subscribe(data=>{

    if(null == data){
      Swal.fire({
        title: 'เข้าสู่ระบบล้มเหลว',
        text: "กรุณาตรวจสอบ เลขพนักงาน หรือ พาสเวิร์ด",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#d33',
        confirmButtonText: 'ตกลง'
      })
    }else{
      this.mapperObject(data);
      Swal.fire({
        title: 'ยินดีต้อนรับ',
        text: "Your work has been saved",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        if (result.isConfirmed) {

          let navigationExtras: NavigationExtras = {
            queryParams: {
                "user": JSON.stringify(this.user)
            }
          };

          this.route.navigate(['/admin/dashboard'], navigationExtras);
        }
      })
    }
    });
  }

  doSession(){
    var rootUrl = service.doSession + "?attrId=" + this.user.username;
    this.utilService.getString(rootUrl).subscribe(data=>{

      console.log("doSession : " + data);
      if("1" == data.body){
        let navigationExtras: NavigationExtras = {
          queryParams: {
              "user": JSON.stringify(this.user)
          }
        };
        this.route.navigate(['/admin/dashboard'], navigationExtras);
      }else{

      }

    });
  }

  mapperObject(data : any){

    this.user.username = data.userName;
    this.user.password = data.password;
    this.user.status = data.status;
  }

}
