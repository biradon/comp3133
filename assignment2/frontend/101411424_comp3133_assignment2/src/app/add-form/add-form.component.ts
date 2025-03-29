import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  imports: [FormsModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent {
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
