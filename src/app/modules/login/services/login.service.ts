import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  // Método mockeado de login
  login(email: string, password: string): Observable<string> {
    // Validar que el email sea válido
    if (!this.isValidEmail(email)) {
      return throwError(() => new Error('Email no es válido'));
    }

    // Validar que la contraseña tenga entre 6 y 12 caracteres
    if (password.length < 6 || password.length > 12) {
      return throwError(() => new Error('La contraseña debe tener entre 6 y 12 caracteres'));
    }

    // Si las validaciones son correctas, retornar un Observable de éxito
    return of('Login exitoso');
  }

  // Método privado para validar si el email tiene un formato válido
  private isValidEmail(email: string): boolean {
    // Expresión regular básica para validar un email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
}
