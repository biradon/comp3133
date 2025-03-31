import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { AddEmployee } from '../graphql/queries';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-form',
  imports: [FormsModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent {

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    
  }

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


  onSubmit() {
    this.apollo.mutate({
      mutation: AddEmployee,
      variables: {
        input: {
          first_name: this.employee.first_name,
          last_name: this.employee.last_name,
          email: this.employee.email,
          gender: this.employee.gender,
          designation: this.employee.designation,
          salary: this.employee.salary,
          employee_photo: this.employee.employee_photo,
          department: this.employee.department,
        }
      }
    }).subscribe({
      next: (response) => {
        console.log('Employee added successfully:', response);
        alert('Employee added successfully')
      },
      error: (err) => {
        console.error('Error adding employee:', err);
      }
    });

    console.log(this.employee);
  }


}
