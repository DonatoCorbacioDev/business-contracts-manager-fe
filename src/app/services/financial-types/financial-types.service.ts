import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinancialType } from '../../models/financial-type.model';

const baseUrl = 'http://localhost:8081/financial-types';

@Injectable({
  providedIn: 'root'
})
export class FinancialTypesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<FinancialType[]> {
    return this.http.get<FinancialType[]>(`${baseUrl}/getAll`);
  }

  getFinancialTypeById(id: number): Observable<FinancialType> {
    return this.http.get<FinancialType>(`${baseUrl}/getById?id=${id}`);
  }

  insertFinancialType(financialType: FinancialType): Observable<FinancialType> {
    return this.http.post<FinancialType>(`${baseUrl}/insert`, financialType);
  }

  updateFinancialType(id: number, financialType: FinancialType): Observable<FinancialType> {
    return this.http.put<FinancialType>(`${baseUrl}/update`, financialType);
  }

  deleteFinancialType(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete?id=${id}`);
  }
}
