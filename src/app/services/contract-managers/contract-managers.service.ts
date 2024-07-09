import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContractManagerAssignment } from '../../models/contract-manager-assignment.model';

@Injectable({
  providedIn: 'root'
})
export class ContractManagersService {
  private baseUrl = 'http://localhost:8081/contracts/assignManagers';

  constructor(private http: HttpClient) { }

  assignManagers(assignment: ContractManagerAssignment): Observable<any> {
    return this.http.post<any>(this.baseUrl, assignment).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
