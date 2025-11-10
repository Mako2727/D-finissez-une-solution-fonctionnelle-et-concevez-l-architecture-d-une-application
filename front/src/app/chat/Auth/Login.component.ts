import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  nom = '';
  motDePasse = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.nom || !this.motDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.authService.login(this.nom, this.motDePasse).subscribe({
      next: res => {
        // Stocke le rôle et le nom
        localStorage.setItem('role', res.role);
        localStorage.setItem('nom', this.nom);

        // Redirection vers la page de chat
        this.router.navigate(['/chat']);
      },
      error: err => {
        this.errorMessage = 'Nom ou mot de passe incorrect';
      }
    });
  }
}