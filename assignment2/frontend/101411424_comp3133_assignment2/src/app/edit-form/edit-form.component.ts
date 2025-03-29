import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-edit-form',
  imports: [FormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {

  constructor(private apiEmployeeService: EmployeeService) {}

  ngOnInit() {
    
  }

  employee = {
    id: '',
    name: '',
    phone: '',
    email: '',
    salary: '',
    title: '',
    position: '',
    department: ''
  };



  onSubmit() {
    this.apiEmployeeService.editEmployee(this.employee.id, this.employee).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (error: any) => {
        console.log(`Error while create employee: ${error}`)
      }
    })
  }
}
