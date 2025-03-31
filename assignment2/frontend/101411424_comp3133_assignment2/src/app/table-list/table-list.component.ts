import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetAllEmployees } from '../graphql/queries';
import { CommonModule } from '@angular/common';
import { DeleteEmployee } from '../graphql/queries';
import { LogoutBtnComponent } from '../logout-btn/logout-btn.component';

@Component({
  selector: 'app-table-list',
  imports: [CommonModule, LogoutBtnComponent],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  employeeId: string | null = null;
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






}
