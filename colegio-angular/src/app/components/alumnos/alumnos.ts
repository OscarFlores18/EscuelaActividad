import { Component, ChangeDetectorRef, OnInit  } from '@angular/core';import { ReactiveFormsModule } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos implements OnInit {

  alumnos: Alumno[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('🔥 ALUMNOS COMPONENTE CREADO');
  }

  ngOnInit(): void {
    console.log('🔥 EJECUTANDO CARGAR ALUMNOS');
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {

    console.log('🔥 CARGANDO ALUMNOS...');

    this.alumnoService.obtenerAlumnos().subscribe({

      next: (data) => {

        console.log('🔥 ALUMNOS RECIBIDOS:', data);

        this.alumnos = data;

        // 🔥 Fuerza a Angular a actualizar la pantalla
        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Error al obtener alumnos:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los alumnos.'
        });

      }

    });

  }


  abrirFormularioAlumno(): void {

    Swal.fire({

      title: 'Nuevo alumno',

      html: `
        <input
          id="nombre"
          class="swal2-input"
          placeholder="Nombre">

        <input
          id="apellido"
          class="swal2-input"
          placeholder="Apellido">

        <input
          id="dni"
          class="swal2-input"
          placeholder="DNI"
          type="text">

        <input
          id="email"
          class="swal2-input"
          placeholder="Email"
          type="email">
      `,

      confirmButtonText: 'Guardar alumno',
      cancelButtonText: 'Cancelar',

      showCancelButton: true,

      focusConfirm: false,

      preConfirm: () => {

        const nombre = (
          document.getElementById('nombre') as HTMLInputElement
        ).value;

        const apellido = (
          document.getElementById('apellido') as HTMLInputElement
        ).value;

        const dni = (
          document.getElementById('dni') as HTMLInputElement
        ).value;

        const email = (
          document.getElementById('email') as HTMLInputElement
        ).value;


        // VALIDACIONES

        if (!nombre || !apellido || !dni || !email) {

          Swal.showValidationMessage(
            'Completá todos los campos'
          );

          return false;
        }


        if (!/^[0-9]+$/.test(dni)) {

          Swal.showValidationMessage(
            'El DNI debe contener solamente números'
          );

          return false;
        }


        if (!email.includes('@')) {

          Swal.showValidationMessage(
            'Ingresá un email válido'
          );

          return false;
        }


        return {
          nombre,
          apellido,
          dni,
          email
        };

      }

    }).then((resultado) => {

      if (resultado.isConfirmed) {

        const alumno: Alumno = resultado.value;

        this.crearAlumno(alumno);

      }

    });

  }

abrirFormularioEdicion(alumno: Alumno): void {
  Swal.fire({
    title: 'Editar alumno',
    html: `
      <input id="nombre"
        class="swal2-input"
        placeholder="Nombre"
        value="${alumno.nombre}">

      <input id="apellido"
        class="swal2-input"
        placeholder="Apellido"
        value="${alumno.apellido}">

      <input id="dni"
        class="swal2-input"
        placeholder="DNI"
        value="${alumno.dni}">

      <input id="email"
        class="swal2-input"
        type="email"
        placeholder="Email"
        value="${alumno.email}">
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar cambios',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    preConfirm: () => {
      const nombre =
        (document.getElementById('nombre') as HTMLInputElement).value;
      const apellido =
        (document.getElementById('apellido') as HTMLInputElement).value;
      const dni =
        (document.getElementById('dni') as HTMLInputElement).value;
      const email =
        (document.getElementById('email') as HTMLInputElement).value;

      if (!nombre || !apellido || !dni || !email) {
        Swal.showValidationMessage(
          'Completá todos los campos'
        );
        return false;
      }

      if (!/^[0-9]+$/.test(dni)) {
        Swal.showValidationMessage(
          'El DNI debe contener solamente números'
        );
        return false;
      }

      if (!email.includes('@')) {
        Swal.showValidationMessage(
          'Ingresá un email válido'
        );
        return false;
      }

      return { nombre, apellido, dni, email };
    }
  }).then(resultado => {
    if (resultado.isConfirmed) {
      this.modificarAlumno(
        alumno.id,
        resultado.value as Alumno
      );
    }
  });
}

modificarAlumno(id: number, alumno: Alumno): void {
  this.alumnoService.modificarAlumno(id, alumno)
    .subscribe({
      next: () => {
        Swal.fire(
          '¡Modificado!',
          'Los datos del alumno fueron actualizados.',
          'success'
        );
        this.cargarAlumnos();
      },
      error: error => {
        console.error(error);
        Swal.fire(
          'Error',
          'No se pudo modificar el alumno.',
          'error'
        );
      }
    });
}
confirmarEliminacion(alumno: Alumno): void {
  Swal.fire({
    title: '¿Eliminar alumno?',
    text: `Se eliminará a ${alumno.nombre} ${alumno.apellido}.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(resultado => {
    if (resultado.isConfirmed) {
      this.eliminarAlumno(alumno.id);
    }
  });
}

eliminarAlumno(id: number): void {
  this.alumnoService.eliminarAlumno(id)
    .subscribe({
      next: () => {
        Swal.fire(
          '¡Eliminado!',
          'El alumno fue dado de baja.',
          'success'
        );
        this.cargarAlumnos();
      },
      error: error => {
        console.error(error);
        Swal.fire(
          'Error',
          'No se pudo eliminar el alumno.',
          'error'
        );
      }
    });
}

  crearAlumno(alumno: Alumno): void {

    this.alumnoService.crearAlumno(alumno).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: '¡Alumno creado!',
          text: 'El alumno fue registrado correctamente.',
          confirmButtonText: 'Aceptar'
        });

        this.cargarAlumnos();

      },

      error: (error) => {

        console.error('Error al crear alumno:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el alumno.'
        });

      }

    });

  }

}