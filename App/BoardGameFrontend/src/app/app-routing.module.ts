import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SingleGameComponent } from './single-game/single-game.component';
import { SearchComponent } from './search/search.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

const routes: Routes = [
  {
    path: 'myAccount',
    component: MyAccountComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'recommendations',
    component: RecommendationsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthService]
  },
  {
    path: 'game',
    component: SingleGameComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }, 
  {
    path: '**',
    pathMatch: 'full', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
