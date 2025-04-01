import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { AddEmployee } from '../graphql/queries';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import imageCompression from 'browser-image-compression';



@Component({
  selector: 'app-add-form',
  imports: [FormsModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent {

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

  imageBase64: string = '';

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
          employee_photo: this.imageBase64,
          department: this.employee.department,
        }
      }
    }).subscribe({
      next: (response) => {
        console.log('Employee added successfully:', response);
        alert('Employee added successfully')
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Error adding employee:', err);
      }
    });

    console.log(this.employee);
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        // Set compression options
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 500, 
          useWebWorker: true
        };
  
        // Compress the file
        const compressedFile = await imageCompression(file, options);
  
        // Convert to Base64
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          this.imageBase64 = reader.result as string;
          console.log('Compressed Image:', this.imageBase64);
        };
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  }


}
