import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) {}


  getWithoutBearer(url: string) {
    const headers = new HttpHeaders({});
    return this.http.get<any>(url, { headers }).pipe(
      map((response: any) => response) // Extract the body here
    );
  }



postWithBearer(url: string, body: any): Observable<any> {

  const accessToken = localStorage.getItem("accessToken");

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': accessToken ? accessToken : '' // Directly add the accessToken to Authorization header
  });

  return this.http.post<any>(url, body, { headers }).pipe(
    map((response: any) => response) // Extract the body here
  );
}



getWithBearer(url: string) {

  const accessToken = localStorage.getItem("accessToken");

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': accessToken ? accessToken : '' // Directly add the accessToken to Authorization header
  });

    return this.http.get<any>(url, { headers }).pipe(
      map((response: any) => response) // Extract the body here
    );
  }
}
