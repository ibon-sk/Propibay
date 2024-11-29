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
      this.loginController.login(email, password).then((response: any) => {
        localStorage.setItem('email', email);
        localStorage.setItem('tokenCreationTime', new Date().getTime().toString());
        if (response.esAdmin) { // Cambiado a esAdmin
          localStorage.setItem('adminToken', response.token);
          this.router.navigate(['/admin']);
        } else {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/home']);
        }
      }).catch(() => {
        this.showLoginError = true;
      });
    }
  }

  onGoogleLogin() {}

  onClickCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
