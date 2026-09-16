import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {

    this.alumnoService.obtenerAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
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