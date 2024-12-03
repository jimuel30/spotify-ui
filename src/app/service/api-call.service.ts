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


  // postWithBearer(url:string,body:any): Observable<any> {
  //   const headers = new HttpHeaders({});
  //   return this.http.post<any>(url, body, { headers }).pipe(
  //     map((response: any) => response) // Extract the body here
  //   );
  // }



postWithBearer(url: string, body: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    // No need to add Authorization header if using cookies for authentication
  });

  return this.http.post<any>(url, body, { headers, withCredentials: true }).pipe(
    map((response: any) => response) // Extract the body here
  );
}



getWithBearer(url: string) {
    // const accessToken =  this.getAccessToken();
    // console.log("token: "+accessToken)

  console.log(document.cookie)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    // No need to add Authorization header if using cookies for authentication
  });

    return this.http.get<any>(url, { headers, withCredentials: true }).pipe(
      map((response: any) => response) // Extract the body here
    );
  }

  // getCookie(name: string): string | null | undefined {
  //   const value = `; ${document.cookie}`;
  //   console.log("VALUE:" + value)
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop()!.split(';').shift();
  //   return null;  // Return null if cookie is not found
  // }
  //
  // // Method to get the access token from cookies
  // getAccessToken(): string | null | undefined{
  //   return this.getCookie('access_token');
  // }
  //
  // // Method to get the refresh token from cookies
  // getRefreshToken(): string | null | undefined{
  //   return this.getCookie('refresh_token');
  // }
}
