import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
    private cursoService: CursoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.obtenerCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.cdr.detectChanges();
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


abrirFormularioEditar(curso: Curso): void {
  Swal.fire({
    title: 'Editar curso',
    html: `
      <input id="ciclo_lectivo" class="swal2-input"
        placeholder="Ciclo lectivo" value="${curso.ciclo_lectivo}">
      <input id="division" class="swal2-input"
        placeholder="División" value="${curso.division}">
      <input id="grado" class="swal2-input"
        placeholder="Grado" value="${curso.grado}">
      <input id="turno" class="swal2-input"
        placeholder="Turno" value="${curso.turno}">
      <input id="cupo_maximo" class="swal2-input"
        type="number" placeholder="Cupo máximo" value="${curso.cupo_maximo}">
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar cambios',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    preConfirm: () => {
      const ciclo_lectivo =
        (document.getElementById('ciclo_lectivo') as HTMLInputElement).value.trim();
      const division =
        (document.getElementById('division') as HTMLInputElement).value.trim();
      const grado =
        (document.getElementById('grado') as HTMLInputElement).value.trim();
      const turno =
        (document.getElementById('turno') as HTMLInputElement).value.trim();
      const cupo_maximo =
        (document.getElementById('cupo_maximo') as HTMLInputElement).value.trim();

      if (!ciclo_lectivo || !division || !grado || !turno || !cupo_maximo) {
        Swal.showValidationMessage('Completá todos los campos');
        return false;
      }

      return { ciclo_lectivo, division, grado, turno, cupo_maximo };
    }
  }).then((resultado) => {
    if (resultado.isConfirmed && resultado.value) {
      this.cursoService.modificarCurso(curso.id, resultado.value).subscribe({
        next: () => {
          Swal.fire('¡Modificado!', 'El curso se actualizó correctamente.', 'success');
          this.cargarCursos();
        },
        error: (error) => {
          console.error('Error al modificar curso:', error);
          Swal.fire('Error', 'No se pudo modificar el curso.', 'error');
        }
      });
    }
  });
}

confirmarEliminar(curso: Curso): void {
  Swal.fire({
    title: '¿Eliminar curso?',
    text: `Se eliminará el curso ${curso.grado} ${curso.division}.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      this.cursoService.eliminarCurso(curso.id).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'El curso fue eliminado.', 'success');
          this.cargarCursos();
        },
        error: (error) => {
          console.error('Error al eliminar curso:', error);

          const mensaje = error.status === 409
            ? 'No se puede eliminar este curso porque tiene alumnos asociados (o no existe).'
            : 'No se pudo eliminar el curso.';

          Swal.fire('No se pudo eliminar', mensaje, 'error');
        }
      });
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