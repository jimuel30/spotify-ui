import { Component } from '@angular/core';
import {ApiCallService} from "../../service/api-call.service";
import {UrlConstant} from "../../constant/UrlConstant";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  errorMessage = "";

  constructor(private apiService:ApiCallService){
  }


  loginHandler(){


    localStorage.clear();

    this.apiService.getWithoutBearer(UrlConstant.LOGIN_URL).subscribe({
      next: (v) => {
        const url = v.data;
        window.location.replace(url);
      },
      error: (e) => {
        console.log(e.message)
        console.log(e)
        this.errorMessage = e.message;
      },
      complete: () => console.info('complete'),
    });
  }


}
