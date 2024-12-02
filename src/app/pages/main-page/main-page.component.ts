import {Component, OnInit} from '@angular/core';
import {ApiCallService} from "../../service/api-call.service";
import {Artist} from "../../interfaces/Spotify";
import {ArtistCardComponent} from "../../components/artist-card/artist-card.component";
import {NgForOf} from "@angular/common";
import {UrlConstant} from "../../constant/UrlConstant";

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

  constructor(private apiService:ApiCallService){
  }


  ngOnInit(): void {
        this.getTopArtistsHandler();
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
