import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {

    currentRoute: string | undefined;

    constructor(private router: Router) {}

    goToOffers() {
      this.router.navigate(['/offers']);
    }
  
    goProfile() {
      this.router.navigate(['/profile']);
    }

    goCreateOffer() {
      this.router.navigate(['/create-property']);
    }

    goChat() {
      this.router.navigate(['/chat']);
    }

    goHome() {
      this.currentRoute = this.router.url;
      this.currentRoute?.includes('/admin') ? this.router.navigate(['/admin']) : this.router.navigate(['/home']);
    }

    shouldShowButtons(): boolean {
      this.currentRoute = this.router.url;
      return !this.currentRoute?.includes('/admin');
    }

    shouldShowMenu(): boolean {
      this.currentRoute = this.router.url;
      return this.currentRoute !== '/login' && this.currentRoute !== '/create-account';
    }
}
