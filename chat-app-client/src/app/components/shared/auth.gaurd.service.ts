import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    userDetails: any = {};
  constructor(
      private router: Router) {}

  // Function to check if user logged in or not to view route
  canActivate(): boolean {
    // Check if user is loggedIn
    this.userDetails = JSON.parse(localStorage.getItem('loggedInUser'))
    if (this.userDetails && this.userDetails.email) {
      if (this.userDetails.username) {
          return true; // Return true: User is allowed to view route
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
