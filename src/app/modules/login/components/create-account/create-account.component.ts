import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validators/password-validator';
import { Router } from '@angular/router';


@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
  })
export class CreateAccountComponent {
    createAccountForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
      this.createAccountForm = this.fb.group({
        firstName: ['', Validators.required],
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
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
        console.log('Formulario enviado', this.createAccountForm.value);
        this.router.navigate(['/home']);
      }
    }
}
