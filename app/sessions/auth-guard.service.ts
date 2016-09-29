import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { SessionService}  from './session.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(protected router: Router, protected sessionService: SessionService)
  {

  }

  canActivate() {
    if(this.sessionService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/sign_in']);
      return false;
    }
  }
}
