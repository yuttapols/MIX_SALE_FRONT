import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import {Car} from '../models/car';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  title: string = 'TCSer';
  public greeting = "";

  public cars:Car[] = [];

  //for normal injection, constructor(private _carService: CarService) 
  constructor(private _carService: CarService) {
  }

  ngOnInit(): void {
    //for normal injection, this.cars = this._carService.getCars();
    this._carService.getCars().subscribe(data => this.cars = data);
  }

  onClick(event: any) {
    console.log(event);
    this.greeting = "Hello User";
    console.log(event.toElement.value);
    console.log(event.target.value);
  }

  log(value: string) {
    console.log(value);
  }

  /*
  disableDragEvent(event: any){
    event.preventDefault();
    console.log('Drag event called')
    return false;
  }
  disableDropEvent(event: any){
    event.preventDefault();
    console.log('Drop event called')
    return false;
  }
  disableDragenterEvent(event: any){
    event.preventDefault();
    console.log('Dragenter event called')
    return false;
  }
  */

  
}

//setTimeout(() => {
    //  this.title = "Learner";
    //}, 2000);