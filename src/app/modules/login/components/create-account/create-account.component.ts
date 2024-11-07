import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validators/password-validator';
import { Router } from '@angular/router';
import { LoginController } from '../../controllers/login.controller';
import { User } from '../../../shared/models/user';


@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
  })
export class CreateAccountComponent {
    createAccountForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private controller: LoginController) {
      this.createAccountForm = this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', passwordValidator()]
      });
    }

    goBack(): void {
      this.router.navigate(['/login']);
    }
  
    onSubmit() {
      this.createAccountForm.markAllAsTouched();
      if (this.createAccountForm.valid) {
        const user: User = {
          name: this.createAccountForm.value.name,
          lastName: this.createAccountForm.value.lastName,
          email: this.createAccountForm.value.email,
          password: this.createAccountForm.value.password
        }
        this.controller.createAccount(user).then(() => {
          this.router.navigate(['/login']);
        });
      }
    }
}
