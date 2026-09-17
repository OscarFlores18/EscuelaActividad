import { Routes } from '@angular/router';
import { Alumnos } from './components/alumnos/alumnos';
import { Cursos } from './components/cursos/cursos';
import { Administracion } from './components/administracion/administracion';

export const routes: Routes = [
  {
    path: 'alumnos',
    component: Alumnos
  },
  {
    path: 'cursos',
    component: Cursos
  },
  {
    path: 'administracion',
    component: Administracion
  },
  {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  }
];