import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  imports: [FormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {
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
    console.log(this.employee);
    alert(JSON.stringify(this.employee))
  }
}
