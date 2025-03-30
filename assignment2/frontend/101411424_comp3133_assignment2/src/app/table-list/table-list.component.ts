import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetAllEmployees } from '../graphql/queries';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-list',
  imports: [CommonModule],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  employees: any[] = []
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GetAllEmployees
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.employees = data.getAllEmployees;
      this.error = error;
      console.log(data)
  });
}

  // getEmployees() {
  //   this.apiEmployeeService.getEmployees().subscribe({
  //     next: (response: any) => {
  //       this.employees = response
  //     },
  //     error: (error: any) => {
  //       console.log(`Error while get employees: ${error}`)
  //     }
  //   })
  // }

  // getEmployeebyID() {
  //   this.apiEmployeeService.getEmployeeByID("1").subscribe({
  //     next: (response: any) => {
  //       this.employees = response
  //     },
  //     error: (error: any) => {
  //       console.log(`Error while get employee by ID: ${error}`)
  //     }
  //   })
  // }

  // deleteEmployee() {
  //   this.apiEmployeeService.deleteEmployee("1").subscribe({
  //     next: (response: any) => {
  //       this.employees = response
  //     },
  //     error: (error: any) => {
  //       console.log(`Error while delete employee: ${error}`)
  //     }
  //   })
  // }
}
