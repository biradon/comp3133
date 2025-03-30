import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { GetAllEmployees } from '../graphql/queries';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  API_BASE_URL = ''

  constructor(private httpClient: HttpClient,private apollo: Apollo) { }

  public getEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: GetAllEmployees,
    }).valueChanges.pipe(map((result: any) => result.data.employees));
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
