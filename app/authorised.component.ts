import { Component } from '@angular/core';
import { SessionService } from './sessions/session.service'
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'authorized-app',
  templateUrl: './authorised.component.html',
})
export class AuthorisedComponent {

  constructor(private router: Router, private sessionService: SessionService) {
  }

  signOut(event: Event): void {
    event.preventDefault();

    this.sessionService.signOut().then(result => {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/sign_in']);
    });
  }
}
