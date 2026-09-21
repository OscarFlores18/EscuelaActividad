import { Component } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

        this.router.navigate(['/alumnos']);
      },

      error: (error) => {
        console.error('Error de login:', error);
      }

    });
  }
}