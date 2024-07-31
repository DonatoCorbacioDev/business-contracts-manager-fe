import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        this.router.navigate(['/home']);
      },
      error => {
        this.error = 'Invalid username or password';
      }
    );
  }
}
