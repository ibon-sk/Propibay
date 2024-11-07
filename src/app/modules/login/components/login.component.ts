import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginController } from '../controllers/login.controller';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showLoginError = false;

  constructor(private loginController: LoginController, private router: Router, private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginController.login(email, password).then((response: any) => {
          localStorage.setItem('authToken', response.token);
          this.userService.setEmail(email);
          this.router.navigate(['/home']);
        }).catch(() => {
          this.loginController.adminLogin(email, password).then((response: any) => {
            localStorage.setItem('adminToken', response.token);
            this.userService.setEmail(email);
            this.router.navigate(['/admin']);
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
