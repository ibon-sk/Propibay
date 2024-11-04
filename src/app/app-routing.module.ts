import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module'; 

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
  { path: '**', redirectTo: '/login' } // Redirigir a login para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
