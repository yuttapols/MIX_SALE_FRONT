import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp',
  template: `
  <div class="container my-3">
    <h4>Employees component is working !!</h4>
    <button type="button" (click)="goBack()" class="btn btn-secondary m-2">Go back </button>
  <div>
  `,
  styles: [
  ]
})
export class EmpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goBack(){
    this.router.navigate(['/test']);
  }

}
