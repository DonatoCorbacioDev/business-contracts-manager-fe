import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

const baseUrl = 'http://localhost:8081/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/getAll`);
  }

  insert(user: User): Observable<User> {
    return this.http.post<User>(`${baseUrl}/insert`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${baseUrl}/update`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete?id=${id}`);
  }
}
