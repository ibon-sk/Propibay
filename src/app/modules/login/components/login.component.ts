import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginController } from '../controllers/login.controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  loginSuccess: string | null = null;

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
        next: (response: string) => {
          this.loginSuccess = response;
          this.loginError = null;
        },
        error: (error: any) => {
          this.loginError = error.message;
          this.loginSuccess = null;
        }
      });
    }
  }

  onGoogleLogin() {
    window.location.href = 'https://accounts.google.com/signin';
  }

  onCreateAccount() {
    // navegar a la ruta de creación de cuenta
  }
}
