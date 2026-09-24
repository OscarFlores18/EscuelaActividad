import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({

      next: (response) => {

        this.authService.guardarToken(response.token);

        console.log('Login correcto');

        // =========================
        // SWEETALERT BIENVENIDA
        // =========================

        const rol = this.authService.obtenerRol();

        let mensaje = 'Bienvenido';

        if (rol === 'ADMIN') {
          mensaje = 'Bienvenido Admin ';
        }

        if (rol === 'DOCENTE') {
          mensaje = 'Bienvenido Docente ';
        }

        if (rol === 'SECRETARIA') {
          mensaje = 'Bienvenido Secretaria ';
        }

        Swal.fire({
          title: mensaje,
          text: 'Inicio de sesión exitoso',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#2563eb',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {

          this.router.navigate(['/alumnos']);

        });

      },

      error: (error) => {
        console.error('Error de login:', error);

        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc2626'
        });
      }

    });
  }
}
