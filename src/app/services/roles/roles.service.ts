import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from '../../models/role.model';

const baseUrl = 'http://localhost:8081/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${baseUrl}/getAll`);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${baseUrl}/getById?id=${id}`);
  }

  insert(role: Role): Observable<Role> {
    return this.http.post<Role>(`${baseUrl}/insert`, role);
  }

  update(role: Role): Observable<Role> {
    return this.http.put<Role>(`${baseUrl}/update`, role);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete?id=${id}`).pipe(
      catchError(error => {
        let errorMsg = 'An error occurred';
        if (error.status === 409) { 
          errorMsg = 'Cannot delete role';
        }
        return throwError(errorMsg);
      })
    );
  }
}
