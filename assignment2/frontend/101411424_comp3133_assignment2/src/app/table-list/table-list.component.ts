import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetAllEmployees } from '../graphql/queries';
import { CommonModule } from '@angular/common';
import { LogoutBtnComponent } from '../logout-btn/logout-btn.component';
import { SearchEmployeeByDepartment } from '../graphql/queries';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-table-list',
  imports: [CommonModule, LogoutBtnComponent, FormsModule],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  employeeId: string | null = null;
  employees: any[] = []
  employeeDepartment: string | null = null;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getAllEmployee()
  }

  public getAllEmployee(): void {
    this.apollo.watchQuery({
      query: GetAllEmployees
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.employees = data.getAllEmployees;
      this.error = error;
      console.log(data)
  });
  }

  public searchClick(): void {
    this.apollo.watchQuery({
      query: SearchEmployeeByDepartment,
      variables: {department: this.employeeDepartment}
    })
    .valueChanges.subscribe({
      next: (result: any) => {
        this.employees = result.data?.searchByDesignationOrDepartment
        console.log("Searching for department:", this.employeeDepartment);
      }
    })
  }

  public cancelSearch() {
    this.getAllEmployee()
  }






}
