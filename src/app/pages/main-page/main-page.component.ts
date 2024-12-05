import {Component, OnInit} from '@angular/core';
import {ApiCallService} from "../../service/api-call.service";
import {Artist} from "../../interfaces/Spotify";
import {ArtistCardComponent} from "../../components/artist-card/artist-card.component";
import {Location, NgForOf} from "@angular/common";
import {UrlConstant} from "../../constant/UrlConstant";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    ArtistCardComponent,
    NgForOf
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{

  artists:Artist[] = [];
  accessToken = ""
  refreshToken = ""

  constructor(private apiService:ApiCallService, private route: ActivatedRoute, private location:Location){
  }


  ngOnInit(): void {


    this.validateAccessToken()
    this.location.replaceState("/main")
    console.log("State: ");
    console.log(this.location.getState())

  }

  validateAccessToken(){
    if(localStorage.getItem("accessToken") === undefined || localStorage.getItem("accessToken") === null){
      this.route.queryParams.subscribe(params => {
        this.accessToken = params['access_token'];
        this.refreshToken = params['refresh_token'];

        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", this.refreshToken);



      });
    }
  }






  getTopArtistsHandler(){
    this.apiService.getWithBearer(UrlConstant.TOP_ARTIST_URL).subscribe({
      next: (v) => {
        this.artists = v.data;
        console.log(this.artists)
      },
      error: (e) => {
        console.log(e.error.message)
      },
      complete: () => console.info('complete'),
    });
  }
}
