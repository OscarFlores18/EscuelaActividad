import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  imports: [RouterOutlet, RouterLink],
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}