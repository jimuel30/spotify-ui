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
  constructor(private apiService:ApiCallService){
  }


  loginHandler(){
    this.apiService.getWithoutBearer(UrlConstant.LOGIN_URL).subscribe({
      next: (v) => {
        const url = v.data;
        window.location.replace(url);
      },
      error: (e) => {
        console.log(e.error.message)
      },
      complete: () => console.info('complete'),
    });
  }


}
