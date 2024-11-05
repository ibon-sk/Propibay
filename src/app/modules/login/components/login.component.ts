import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginController } from '../controllers/login.controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showLoginError = false;

  constructor(private loginController: LoginController) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginController.login(email, password).subscribe({
        next: (response: number) => {
          response === 0 ? window.location.href = '/home' : 
          response === 1 ? window.location.href = '/admin' : 
          this.showLoginError = true;
        }
      });
    }
  }

  onGoogleLogin() {
    window.location.href = 'https://accounts.google.com/signin';
  }

  onClickCreateAccount() {
    window.location.href = '/create-account';
  }
}
