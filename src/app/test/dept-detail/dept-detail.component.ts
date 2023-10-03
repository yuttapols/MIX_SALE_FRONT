import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-dept-detail',
  template: `
    <div class="container my-3">
      <h4>
        You've selected id = {{departmentId}}
      </h4>
      <p>
        <button type="button" (click)="goOverview()" class="btn btn-info m-2">Overview</button>
        <button type="button" (click)="goContacts()" class="btn btn-info m-2">Contacts</button>
      </p>
      <router-outlet></router-outlet>
      <p>
        <button type="button" (click)="goPrevious()" class="btn btn-success m-2">← Previous</button>
        <button type="button" (click)="goNext()" class="btn btn-success m-2">Next →</button>
        <button type="button" (click)="goBack()" class="btn btn-secondary m-2">Go back </button>
      </p>
    <div>
  `,
  styles: [
  ]
})
export class DeptDetailComponent implements OnInit {
  //public departmentId!: String | null;
  public departmentId!: any;

  //injecting activated route for getting router from address bar
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //collecting the parameter from address bar and saving into departmentId, will not wirl for previous, next
    //this.departmentId = parseInt(this.route.snapshot.paramMap.get('id')); 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.departmentId = parseInt(params.get('id')!);
    });
  }

  goPrevious() {
    //console.log("previous");
    let previousId = parseInt(this.departmentId) - 1;
    this.router.navigate(['/test/departments', previousId]);
  }

  goNext() {
    //console.log("next");
    let nextId = parseInt(this.departmentId) + 1;
    this.router.navigate(['/test/departments', nextId]);
  }

  goBack() {
    let selectedId = this.departmentId ? this.departmentId : null
    this.router.navigate(['/test/departments', { id: selectedId }]);
  }
  goOverview() {
    this.router.navigate(['overview'], {relativeTo: this.route});
  }
  goContacts() {
    this.router.navigate(['contacts'], {relativeTo: this.route});
  }

}
