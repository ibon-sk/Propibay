import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './modules/login/components/login.component';
import { CreateAccountComponent } from './modules/login/components/create-account/create-account.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './modules/home/components/home.component';
import { AdminComponent } from './modules/admin/components/admin.component';
import { CreatePropertyComponent } from './modules/property/components/create-property/create-property.component';
import { EditPropertyComponent } from './modules/property/components/edit-property/edit-property.component';
import { PropertyComponent } from './modules/property/components/property.component';
import { ProfileComponent } from './modules/profile/components/profile.component';
import { SharedModule } from './modules/shared/shared.module';
import { HomeController } from './modules/home/controllers/home.controller';
import { HomeService } from './modules/home/services/home.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    AdminComponent,
    PropertyComponent,
    CreatePropertyComponent,
    EditPropertyComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [    
    HomeController,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
