import { SignInOutGuard } from './sign-in-out.guard';
import { AuthGuard } from './auth.guard';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { TvComponent } from './tv/tv.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonComponent } from './person/person.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDeatailsComponent } from './movie-deatails/movie-deatails.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component:HomeComponent},
  {path: "movie", component:MovieComponent},
  {path: "movie/:category", component:MovieComponent},
  {path: "movieDetails/:slug", component:MovieDeatailsComponent},
  {path: "tv", component:TvComponent},
  {path: "tv/:category", component:TvComponent},
  {path: "tvDetails/:slug", component:TvDetailsComponent},
  {path: "person", component:PersonComponent},
  {path: "personDetails/:slug", component:PersonDetailsComponent},
  {path: "signIn", canActivate:[SignInOutGuard], component:SignInComponent},
  {path: "signUp", canActivate:[SignInOutGuard], component:SignUpComponent},
  {path: "userProfile", canActivate:[AuthGuard], component:UserProfileComponent},
  {path: "userSettings", canActivate:[AuthGuard], component:UserSettingsComponent},
  {path: "watchlist", canActivate:[AuthGuard], component:WatchlistComponent},
  {path: "**", component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
