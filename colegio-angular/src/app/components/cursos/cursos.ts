import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  standalone: true,
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos implements OnInit {

  cursos: Curso[] = [];

  constructor(
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.obtenerCursos().subscribe({
      next: (data) => {
        this.cursos = data;
      },
      error: (error) => {
        console.error('Error al obtener cursos:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los cursos.'
        });
      }
    });
  }

  abrirFormularioCurso(): void {

    Swal.fire({
      title: 'Nuevo curso',

      html: `
        <input
          id="ciclo_lectivo"
          class="swal2-input"
          placeholder="Ciclo lectivo">

        <input
          id="division"
          class="swal2-input"
          placeholder="División">

        <input
          id="grado"
          class="swal2-input"
          placeholder="Grado">

        <input
          id="turno"
          class="swal2-input"
          placeholder="Turno">

        <input
          id="cupo_maximo"
          class="swal2-input"
          placeholder="Cupo máximo"
          type="number">
      `,

      confirmButtonText: 'Guardar curso',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusConfirm: false,

      preConfirm: () => {

        const ciclo_lectivo =
          (document.getElementById('ciclo_lectivo') as HTMLInputElement).value;

        const division =
          (document.getElementById('division') as HTMLInputElement).value;

        const grado =
          (document.getElementById('grado') as HTMLInputElement).value;

        const turno =
          (document.getElementById('turno') as HTMLInputElement).value;

        const cupo_maximo =
          (document.getElementById('cupo_maximo') as HTMLInputElement).value;

        if (
          !ciclo_lectivo ||
          !division ||
          !grado ||
          !turno ||
          !cupo_maximo
        ) {
          Swal.showValidationMessage(
            'Completá todos los campos'
          );

          return false;
        }

        return {
          ciclo_lectivo,
          division,
          grado,
          turno,
          cupo_maximo
        };
      }

    }).then((resultado) => {

      if (resultado.isConfirmed) {

        const curso: Curso = resultado.value;

        this.crearCurso(curso);
      }
    });
  }

  crearCurso(curso: Curso): void {

    this.cursoService.crearCurso(curso).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: '¡Curso creado!',
          text: 'El curso fue registrado correctamente.',
          confirmButtonText: 'Aceptar'
        });

        this.cargarCursos();
      },

      error: (error) => {

        console.error('Error al crear curso:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el curso.'
        });
      }
    });
  }
}