import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { SignIn } from '../graphql/queries';
import { SignUp } from '../graphql/queries';
import { Router } from '@angular/router';
import { SessionManagementService } from '../service/session-management.service';



@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  user = {
    username: '',
    password: '',
    email: '',
  };

  constructor(
    private apollo: Apollo, 
    private router: Router, 
    private sessionService: SessionManagementService
  ) {}

  onSubmit() {
    console.log(this.user); // Outputs: { username: 'user input', password: 'pass input' }
    // Process this.user here
  }


  public loginClick(): void {
    this.apollo.watchQuery({
      query: SignIn,
      variables: {
        username: this.user.username,
        password: this.user.password
      }
    })
    .valueChanges.subscribe({
      next: (result: any) => {
        alert(`Welecome ${this.user.username} back!`)
        this.sessionService.setSession(this.user.username);
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Error while login:', err);
        alert(`User not found, please try again`)
      }
    })
  }

  public signUpClick(): void {
    this.apollo.mutate({
      mutation: SignUp,
      variables: {
        input: {
          username: this.user.username,
          password: this.user.password,
          email: `${this.user.username}@gbc.ca`
        }
      }
    }).subscribe({
      next: (response) => {
        console.log('Employee signup successfully:', response);
        alert('Employee signUp successfully');
        this.sessionService.setSession(this.user.username);
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error(`Error Signup: `, err)
        alert(`Error while signing up: Please try again`)
      }
    })
  }
}

