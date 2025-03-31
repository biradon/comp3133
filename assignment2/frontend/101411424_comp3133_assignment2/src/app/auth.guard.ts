import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionManagementService } from './service/session-management.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionManagementService, private router: Router) {}

  canActivate(): boolean {
    if (this.sessionService.isAuthenticated()) {
      return true; 
    } else {
      alert('You have to Login First!!!!')
      this.router.navigate(['/login']);
      return false;
    }
  }
}
