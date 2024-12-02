import {Component, OnInit} from '@angular/core';
import {ApiCallService} from "../../service/api-call.service";
import {ActivatedRoute} from "@angular/router";
import {Artist} from "../../interfaces/Spotify";
import {NgForOf} from "@angular/common";
import {ChatBoxComponent} from "../../components/chat-box/chat-box.component";
import {UrlConstant} from "../../constant/UrlConstant";

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [
    NgForOf,
    ChatBoxComponent
  ],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.css'
})
export class ArtistPageComponent implements OnInit{
  artistId = ""
  artist!:Artist;
  constructor(private route: ActivatedRoute, private apiService: ApiCallService) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('artistId')!;
    this.getArtistInfo()
    }


  getArtistInfo(){
    const url = UrlConstant.GET_ARTIST_URL+this.artistId;
    this.apiService.getWithBearer(url).subscribe({
      next: (v) => {
       this.artist = v.data;
       console.log(this.artist)
      },
      error: (e) => {
        console.log("Error")
        console.log(e)
      },
      complete: () => console.info('complete'),
    });
  }


}
