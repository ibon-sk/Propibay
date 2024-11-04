import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css']
  })
export class CreateAccountComponent {
    createAccountForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.createAccountForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
      });
    }
  
    onSubmit() {
      if (this.createAccountForm.valid) {
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
        console.log('Formulario enviado', this.createAccountForm.value);
      } else {
        // Mostrar mensajes de error
        console.log('Formulario no válido');
      }
    }
}
