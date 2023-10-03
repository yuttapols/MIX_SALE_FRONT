import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-dept-list',
  template: `
    <div class="container my-3">
    <h4>
      Department List
    </h4>
    <p>If you click on each department, address bar will append with the <b>ID</b> 
    and content changed to <b>You've selected id = [id-number]</b></p>
    <p>Also we are adding Previous and Next button to navigate across departments</p>
    <div class="btn-group-vertical mt-2" role="group">
      <button (click)="onSelect(department)" [class.selected]="isSelected(department)" *ngFor="let department of departments" type="button" class="btn btn-outline-success m-1">
        {{department.id}} - {{department.name}}
      </button>
      <button type="button" (click)="goBack()" class="btn btn-secondary m-2">Go back </button>
    </div>
  <div>
  `,
  styles: [
    `.selected { color: blue;}`
  ]
})
export class DeptListComponent implements OnInit {
  departments = [
    { "id": 1, "name": "MEAN Stack" },
    { "id": 2, "name": "Data Science" },
    { "id": 3, "name": "System Admin" },
    { "id": 4, "name": "DevOps" }
  ];
  public selectedId: any;

  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedId = parseInt(params.get('id')!);
    });
  }

  onSelect(department: any) {
    // Angular will construct the URL as /test/departments/id
    this.router.navigate(['/test/departments', department.id]); 
    //this.router.navigate([department.id], {relativeTo: this.route}); //Relative Routing
  }

  isSelected(department: any) {
    return department.id === this.selectedId; //Returns true if selected Id matches with any department id
  }

  goBack() {
    this.router.navigate(['/test']);
  }

}
