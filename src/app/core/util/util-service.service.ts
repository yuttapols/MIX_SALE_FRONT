import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize, retry, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:9091/MIX-SALE'; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get(url:string){
    return this.http.get<HttpResponse<object>>(this.rootURL + url).pipe(retry(1), catchError(this.handleError));
  }

  getString(url:string){
    return this.http.get<HttpResponse<String>>(this.rootURL + url).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}
