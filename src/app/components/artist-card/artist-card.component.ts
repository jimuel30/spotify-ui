import {Component, Input} from '@angular/core';
import {Artist} from "../../interfaces/Spotify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.css'
})
export class ArtistCardComponent {

  @Input() artist!:Artist;

  constructor(private router: Router) {}

  redirect(){
    const url =  "/artist/"+this.artist.id;
    this.router.navigate([url]);
  }
}
