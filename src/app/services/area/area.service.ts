import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Area } from '../../models/area.model';

const baseUrl = 'http://localhost:8081/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Area[]> {
    return this.http.get<Area[]>(`${baseUrl}/getAll`);
  }

  getAreaById(id: number): Observable<Area> {
    return this.http.get<Area>(`${baseUrl}/getById?id=${id}`);
  }

  insertArea(area: Area): Observable<Area> {
    return this.http.post<Area>(`${baseUrl}/insert`, area);
  }

  updateArea(id: number, area: Area): Observable<Area> {
    return this.http.put<Area>(`${baseUrl}/update`, area);
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete?id=${id}`).pipe(
      catchError(error => {
        let errorMsg = 'An error occurred';
        if (error.status === 409) { 
          errorMsg = 'Cannot delete area';
        }
        return throwError(errorMsg);
      })
    );
  }
}
