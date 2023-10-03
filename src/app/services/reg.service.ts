import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ICountries{
  country:String
}
//export interface ICompanies{
//  [index:number]:String[]
//}

@Injectable({
  providedIn: 'root'
})

export class RegService {
  private _countriesURL: string = "/assets/countries.json";
  private _companiesURL: string = "/assets/companies.json";
  
  constructor(private http: HttpClient) { }

  getCountries(): Observable<ICountries[]> {
    return this.http.get<ICountries[]>(this._countriesURL);
  }

  getCompanies(): Observable<String[]> {
    return this.http.get<String[]>(this._companiesURL);
  }
}
