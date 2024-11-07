import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { CreateAccountComponent } from './modules/login/components/create-account/create-account.component';
import { AdminComponent } from './modules/admin/components/admin.component';
import { HomeComponent } from './modules/home/components/home.component';
import { OfferComponent } from './modules/offer/components/offer.component';
import { CreateOfferComponent } from './modules/offer/components/create-offer/create-offer.component';
import { EditOfferComponent } from './modules/offer/components/edit-offer/edit-offer.component';
import { ProfileComponent } from './modules/profile/components/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },            
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'offer/:id', component: OfferComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'create-offer', component: CreateOfferComponent, canActivate: [AuthGuard] },
  { path: 'edit-offer', component: EditOfferComponent, canActivate: [AuthGuard] },
  // Redirige a /login por defecto o si no coincide ninguna ruta
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
