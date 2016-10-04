import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../users/user'
import { ConfigService } from '../config.service'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SessionService {
  private loggedIn = false;
  private sessionsUrl = `admin/sessions`;
  private currentUser: User;

  constructor(private http: Http, private config: ConfigService) {
    let authToken = localStorage.getItem('auth_token');
    this.loggedIn = !!authToken;
    this.sessionsUrl = this.config.getApiEndpoint() + this.sessionsUrl;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User
  }

  signIn(email: string, password: string) : Promise<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        `${this.sessionsUrl}/sign_in`,
        JSON.stringify({ email, password, platform: 'web' }),
        { headers }
      ).toPromise()
      .then((response) => {
          let result = response.json().result;
          localStorage.setItem('auth_token', result.auth_token);
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.loggedIn = true;
          this.currentUser = result as User;
          return this.currentUser;
      })
      .catch(this.handleError);
  }

  signOut(): Promise<any> {
    let authToken = localStorage.getItem('auth_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', authToken);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentUser');

    return this.http
      .post(
        `${this.sessionsUrl}/sign_out`,
        '',
        { headers }
      ).toPromise()
      .then((response) => {
        let result = response.json().result;
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        return result;
      })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
