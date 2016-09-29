import { Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service'
import { User } from '../users/user'

@Component({
  moduleId: module.id,
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [ './sign-in.component.css' ]
})

export class SignInComponent {
  @Input() user: User;

  constructor(public router: Router, public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  signIn(event: Event): void {
    event.preventDefault();

    this.sessionService.signIn(this.user.email, this.user.password).then(result => {
      this.router.navigate(['/users']);
    });
  }
}
