import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private _url:string = "/assets/cars.json";
  constructor(private http: HttpClient) { }

  getCars():Observable<Car[]> {
    return this.http.get<Car[]>(this._url);

  }
}

/*
    return [
      {"id":1, "brand":"Nexon", "engine":900},
      {"id":2, "brand":"Ford", "engine":1500},
      {"id":3, "brand":"Tata", "engine":1200},
      {"id":4, "brand":"Hyundai", "engine":1600}
    ];
*/