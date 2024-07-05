import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractManagerAssignment } from '../../models/contract-manager-assignment.model';

const baseUrl = 'http://localhost:8081contracts/assignManagers';

@Injectable({
  providedIn: 'root'
})
export class ContractManagersService {

  constructor(private http: HttpClient) { }

  assignManagers(assignment: ContractManagerAssignment): Observable<ContractManagerAssignment> {
    return this.http.post<ContractManagerAssignment>(baseUrl, assignment);
  }
}
