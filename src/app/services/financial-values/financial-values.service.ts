import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FinancialValue } from '../../models/financial-value.model';

const baseUrl = 'http://localhost:8081/financial-values';

@Injectable({
  providedIn: 'root'
})
export class FinancialValuesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<FinancialValue[]> {
    return this.http.get<FinancialValue[]>(`${baseUrl}/getAll`);
  }

  getFinancialValueById(id: number): Observable<FinancialValue> {
    return this.http.get<FinancialValue>(`${baseUrl}/getById?id=${id}`);
  }
   
  getByContractId(contractId: number): Observable<FinancialValue[]> {
    return this.http.get<FinancialValue[]>(`${baseUrl}/getByContractId?contractId=${contractId}`);
  }

  insertFinancialValue(financialValue: FinancialValue): Observable<FinancialValue> {
    return this.http.post<FinancialValue>(`${baseUrl}/insert`, financialValue);
  }

  updateFinancialValue(id: number, financialValue: FinancialValue): Observable<FinancialValue> {
    return this.http.put<FinancialValue>(`${baseUrl}/update`, financialValue);
  }

  deleteFinancialValue(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete?id=${id}`).pipe(
      catchError(error => {
        let errorMsg = 'An error occurred';
        if (error.status === 409) { 
          errorMsg = 'Cannot delete financial value';
        }
        return throwError(errorMsg);
      })
    );
  }
}