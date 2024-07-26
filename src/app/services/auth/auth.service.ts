import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/users/login'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      tap(response => {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('manager', JSON.stringify(response.manager));
          localStorage.setItem('role', JSON.stringify(response.role));
        }
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('manager');
      localStorage.removeItem('role');
    }
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('manager');
    }
    return false;
  }

  getManager(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const manager = localStorage.getItem('manager');
      return manager ? JSON.parse(manager) : null;
    }
    return null;
  }

  getRole(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const role = localStorage.getItem('role');
      return role ? JSON.parse(role) : null;
    }
    return null;
  }

  getRoleString(): string {
    const role = this.getRole();
    return role ? role.role : '';
  }
}
