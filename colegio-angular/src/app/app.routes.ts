import { Routes } from '@angular/router';
import { Alumnos } from './components/alumnos/alumnos';
import { Cursos } from './components/cursos/cursos';

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
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  }

];