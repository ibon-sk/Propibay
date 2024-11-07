import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { CreateAccountComponent } from './modules/login/components/create-account/create-account.component';
import { AdminComponent } from './modules/admin/components/admin.component';
import { HomeComponent } from './modules/home/components/home.component';
import { PropertyComponent } from './modules/property/components/property.component';
import { CreatePropertyComponent } from './modules/property/components/create-property/create-property.component';
import { EditPropertyComponent } from './modules/property/components/edit-property/edit-property.component';
import { ProfileComponent } from './modules/profile/components/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { PropertyMapComponent } from './modules/property/components/property-map/property-map.component';
import { MyPropertiesComponent } from './modules/profile/components/my-properties/my-properties.component';
import { MyFavouritesComponent } from './modules/profile/components/my-favourites/my-favourites.component';
import { ChatComponent } from './modules/chat/components/chat.component';
import { AdminUsersComponent } from './modules/admin/components/admin-users/admin-users.component';
import { AdminPropertiesComponent } from './modules/admin/components/admin-properties/admin-properties.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },            
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'property/:id', component: PropertyComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/my-properties', component: MyPropertiesComponent, canActivate: [AuthGuard] },
  { path: 'profile/my-favourites', component: MyFavouritesComponent, canActivate: [AuthGuard] },
  { path: 'create-property', component: CreatePropertyComponent, canActivate: [AuthGuard] },
  { path: 'edit-property', component: EditPropertyComponent, canActivate: [AuthGuard] },
  { path: 'property/:id/map', component: PropertyMapComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  // Rutas protegidas para Administración
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard] },
  { path: 'admin/properties', component: AdminPropertiesComponent, canActivate: [AdminGuard] },
  // Redirige a /login por defecto o si no coincide ninguna ruta
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
