// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // adapte selon ton backend

  constructor(private http: HttpClient, private router: Router) {}

  login(nom: string, motDePasse: string) {
    return this.http.post<{role: string}>(`${this.apiUrl}/login`, { nom, motDePasse })
      .pipe(
        tap(res => {
          localStorage.setItem('role', res.role); // on stocke le rôle
        })
      );
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}