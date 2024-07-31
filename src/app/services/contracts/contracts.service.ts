import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contract } from '../../models/contract.model';
import { AuthService } from '../auth/auth.service';

const baseUrl = 'http://localhost:8081/contracts';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${baseUrl}/getAll`);
  }

  getContractsByManagerId(managerId: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${baseUrl}/getContractsByManagerId?managerId=${managerId}`);
  }

  getContracts(): Observable<Contract[]> {
    const manager = this.authService.getManager();
    const role = this.authService.getRole();
    if (role && role.role === 'Amministratore') {
      return this.getAll();
    } else if (manager && manager.id) {
      return this.getContractsByManagerId(manager.id);
    } else {
      return throwError('User role is not recognized');
    }
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
          errorMsg = 'Cannot delete contract';
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
