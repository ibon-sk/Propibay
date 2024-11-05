import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const required = value !== null;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const minLength = value.length >= 8;

    const passwordValid = required && hasUpperCase && hasLowerCase && hasNumber && minLength;
    return !passwordValid ? { passwordStrength: 'La contraseña debe tener al menos 8 caracteres e incluir una mayúscula, una minúscula y un dígito' } : null;
  };
}
