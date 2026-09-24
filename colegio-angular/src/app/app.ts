import { Component, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import Swal from 'sweetalert2';


import { AuthService } from './services/auth.service';

@Component({
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  protected readonly title = signal('colegio-angular');

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  mostrarMenu(): boolean {
    return this.router.url !== '/login';
  }

cerrarSesion(): void {

  Swal.fire({
    title: '¿Cerrar sesión?',
    text: 'Vas a salir de tu cuenta.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    reverseButtons: true
  }).then((result) => {

    if (result.isConfirmed) {

      this.authService.logout();

      Swal.fire({
        title: 'Sesión cerrada',
        text: 'Hasta luego ',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2563eb',
        timer: 1800,
        timerProgressBar: true
      }).then(() => {

        this.router.navigate(['/login']);

      });

    }

  });

}

}
