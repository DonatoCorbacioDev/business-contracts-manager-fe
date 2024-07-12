import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contract } from '../../models/contract.model';

const baseUrl = 'http://localhost:8081/contracts';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${baseUrl}/getAll`);
  }

  getContractById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${baseUrl}/getById?id=${id}`);
  }

  insertContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${baseUrl}/insert`, contract);
  }

  updateContract(id: number, contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${baseUrl}/update`, contract);
  }

  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete?id=${id}`).pipe(
      catchError(error => {
        let errorMsg = 'An error occurred';
        if (error.status === 409) { 
          errorMsg = 'Cannot delete contract: it is assigned to one or more managers.';
        }
        return throwError(errorMsg);
      })
    );
  }

  assignManagersToContract(contractId: number, managerIds: number[]): Observable<any> {
    const url = `${baseUrl}/assignManagers`;
    return this.http.post<any>(url, { contractId, managerIds });
  }
}
