import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-form',
  imports: [FormsModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent {

  constructor(private apiEmployeeService: EmployeeService) {}

  ngOnInit() {
    
  }

  employee = {
    name: '',
    phone: '',
    email: '',
    salary: '',
    title: '',
    position: '',
    department: ''
  };



  onSubmit() {
    this.apiEmployeeService.createEmployee(this.employee).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (error: any) => {
        console.log(`Error while create employee: ${error}`)
      }
    })
  }


}
