import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { UpdateEmployee } from '../graphql/queries';
import { ActivatedRoute } from '@angular/router';
import { SearchEmployeeByID } from '../graphql/queries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-form',
  imports: [FormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {

  employeeId: string | null = null;
  loading: boolean = true;
  error: any = null;
  editableEmployee: any = {};

  employee = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: '',
    employee_photo: '',
    department: ''
  };

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.fetchEmployeeById(this.employeeId);
    }
    console.log('Editing Employee ID:', this.employeeId);
  }

  fetchEmployeeById(id: string) {
    this.apollo
      .watchQuery({
        query: SearchEmployeeByID,
        variables: { searchByIdId: id }
      })
      .valueChanges.subscribe({
        next: (result: any) => {
          this.employee = result.data?.searchById;
          this.loading = result.loading;
          console.log(`Employee info: ${JSON.stringify(this.employee)}`)
          this.editableEmployee = { ...this.employee }
        },
        error: (err) => {
          this.error = err;
          console.error('Error fetching employee:', err);
        }
    });
  }


  onSubmit() {
    this.apollo.mutate({
      mutation: UpdateEmployee,
      variables: {
        input: {
          id: this.employeeId,
          first_name: this.editableEmployee.first_name,
          last_name: this.editableEmployee.last_name,
          email: this.editableEmployee.email,
          gender: this.editableEmployee.gender,
          designation: this.editableEmployee.designation,
          salary: this.editableEmployee.salary,
          employee_photo: this.editableEmployee.employee_photo,
          department: this.editableEmployee.department,
        }
      }
    }).subscribe({
      next: (response) => {
        console.log('Employee updated successfully:', response);
        alert('Employee updated successfully');
  
        // Navigate back to the employee list after update
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Error updating employee:', err);
      }
    });
  
    console.log(this.editableEmployee);
  }
}
