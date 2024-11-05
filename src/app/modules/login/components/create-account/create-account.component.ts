import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validators/password-validator';


@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
  })
export class CreateAccountComponent {
    createAccountForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.createAccountForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', passwordValidator()]
      });
    }
  
    onSubmit() {
      this.createAccountForm.markAllAsTouched();
      if (this.createAccountForm.valid) {
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
        console.log('Formulario enviado', this.createAccountForm.value);
        window.location.href = '/login';
      }
    }
}
