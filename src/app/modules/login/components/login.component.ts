import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginController } from '../controllers/login.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showLoginError = false;

  constructor(private loginController: LoginController, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginController.adminLogin(email, password).then((response: any) => {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('email', email);
        this.router.navigate(['/admin']);
      }).catch(() => {
        this.loginController.login(email, password).then((response: any) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('tokenCreationTime', new Date().getTime().toString());
          localStorage.setItem('email', email);
          this.router.navigate(['/home']);
        }).catch(() => {
          this.showLoginError = true;
        });
      });
      }
  }

  onGoogleLogin() {
  }

  onClickCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
