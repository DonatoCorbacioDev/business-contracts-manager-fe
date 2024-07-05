import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.delete<void>(`${baseUrl}/delete?id=${id}`);
  }
}
