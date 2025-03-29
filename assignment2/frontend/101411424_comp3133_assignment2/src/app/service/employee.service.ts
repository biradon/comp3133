import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_BASE_URL = ''

  constructor(private httpClient: HttpClient) { }

  public getEmployees(): Observable<any> {
    return this.httpClient.get(this.API_BASE_URL)
  }
  
  public getEmployeeByID(id: string): Observable<any> {
    return this.httpClient.get(`${this.API_BASE_URL}/${id}`)
  }

  public createEmployee(employee: any): Observable<any> {
    return this.httpClient.post(this.API_BASE_URL, employee)
  }

  public editEmployee(id: string, employee: any): Observable<any> {
    return this.httpClient.post(`${this.API_BASE_URL}/${id}`, employee)
  }

  public deleteEmployee(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_BASE_URL}/${id}`)
  }

  public searchEmployee(email: string): Observable<any> {
    return this.httpClient.get(`${this.API_BASE_URL}/${email}`)
  }


}
