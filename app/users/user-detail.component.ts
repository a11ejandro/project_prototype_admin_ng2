import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from './user';
import { UserService } from './user.service';


@Component({
  moduleId: module.id,
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Output() close = new EventEmitter();
  possibleRoles = ['user', 'admin', 'qa'];
  error: any;
  navigated: boolean = false; // true if navigated here
  avatar: File;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let userId = params['id'];
      if (userId != undefined && userId != 'new') {
        this.navigated = true;
        this.userService.getUser(+userId)
          .then(user => this.user = user);
      } else {
        this.navigated = false;
        this.user = new User();
      }
    });
  }

  save(): void {
    this.userService
      .save(this.user)
      .then(user => {
        if(this.avatar) {
          this.userService
            .putAvatar(user, this.avatar)
            .then(user => this.goBack(user))
        } else {
          this.goBack(user);
        }
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

  changeAvatar(event: any): void {
    this.avatar = event.target.files[0];

    let reader = new FileReader();
    let component = this;

    reader.onload = function(e: any) {
      if (component.user) {
        component.user.avatarUrl = e.target.result;
      }
    };

    reader.readAsDataURL(this.avatar);
  }

  goBack(savedUser: User = null): void {
    this.close.emit(savedUser);
    if (this.navigated) { window.history.back(); }
  }
}
