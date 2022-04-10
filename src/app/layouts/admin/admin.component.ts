import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserDTO } from "src/app/model/UserDTO";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  public user : UserDTO = new UserDTO();
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.user = JSON.parse(params["user"]);
    });
    console.log(this.user);
  }
}
