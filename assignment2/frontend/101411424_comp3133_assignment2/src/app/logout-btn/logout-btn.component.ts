import { Component } from '@angular/core';
import { SessionManagementService } from '../service/session-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-btn',
  imports: [],
  templateUrl: './logout-btn.component.html',
  styleUrl: './logout-btn.component.css'
})
export class LogoutBtnComponent {

  constructor(private sessionService: SessionManagementService, private router: Router) {}

  logOut(): void {
    this.sessionService.endSession()
    alert("Logged out Successfully!")
    this.router.navigate(['/login']);
  }
}
