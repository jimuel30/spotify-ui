import { Routes } from '@angular/router';
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ArtistPageComponent} from "./pages/artist-page/artist-page.component";

export const routes: Routes = [
  {path:'',component: LandingPageComponent},
  {path:'main',component: MainPageComponent},
  {path:'artist/:artistId',component:ArtistPageComponent},
];
