import { Component } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-table-list',
  imports: [],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  employees: any[] = []

  constructor(private apiEmployeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees() {
    this.apiEmployeeService.getEmployees().subscribe({
      next: (response: any) => {
        this.employees = response
      },
      error: (error: any) => {
        console.log(`Error while get employees: ${error}`)
      }
    })
  }

  getEmployeebyID() {
    this.apiEmployeeService.getEmployeeByID("1").subscribe({
      next: (response: any) => {
        this.employees = response
      },
      error: (error: any) => {
        console.log(`Error while get employee by ID: ${error}`)
      }
    })
  }

  deleteEmployee() {
    this.apiEmployeeService.deleteEmployee("1").subscribe({
      next: (response: any) => {
        this.employees = response
      },
      error: (error: any) => {
        console.log(`Error while delete employee: ${error}`)
      }
    })
  }
}
