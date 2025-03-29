import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  user = {
    username: '',
    password: ''
  };

  onSubmit() {
    console.log(this.user); // Outputs: { username: 'user input', password: 'pass input' }
    // Process this.user here
  }


  public loginClick(): void {
    alert(`Click Login ${this.user.username}`)
  }

  public signUpClick(): void {
    alert(`Click Signup ${this.user.username}`)
  }
}

