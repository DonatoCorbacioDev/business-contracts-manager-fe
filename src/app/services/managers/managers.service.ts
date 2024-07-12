import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manager } from '../../models/manager.model';

const baseUrl = 'http://localhost:8081/managers';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${baseUrl}/getAll`);
  }

  getManagerById(id: number): Observable<Manager> {
    return this.http.get<Manager>(`${baseUrl}/getById?id=${id}`);
  }

  insertManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(`${baseUrl}/insert`, manager);
  }

  updateManager(manager: Manager): Observable<Manager> {
    return this.http.put<Manager>(`${baseUrl}/update`, manager);
  }

  deleteManager(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete?id=${id}`).pipe(
      catchError(error => {
        let errorMsg = 'An error occurred';
        if (error.status === 409) { 
          errorMsg = 'Cannot delete manager: they are assigned to one or more contracts.';
        }
        return throwError(errorMsg);
      })
    );
  }
}
