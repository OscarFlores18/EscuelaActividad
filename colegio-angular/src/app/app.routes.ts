import { Routes } from '@angular/router';
import { Alumnos } from './components/alumnos/alumnos';
import { Cursos } from './components/cursos/cursos';
import { Administracion } from './components/administracion/administracion';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'alumnos',
    component: Alumnos,
    canActivate: [
      authGuard,
      roleGuard(['ADMIN', 'DOCENTE', 'SECRETARIA'])
    ]
  },

  {
    path: 'cursos',
    component: Cursos,
    canActivate: [
      authGuard,
      roleGuard(['ADMIN', 'DOCENTE'])
    ]
  },

  {
    path: 'administracion',
    component: Administracion,
    canActivate: [
      authGuard,
      roleGuard(['ADMIN'])
    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];