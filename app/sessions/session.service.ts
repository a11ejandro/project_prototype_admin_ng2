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
    let restToken = localStorage.getItem('rest_token');
    this.loggedIn = !!restToken;
    this.sessionsUrl = this.config.getApiEndpoint() + this.sessionsUrl;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User
  }

  signIn(email: string, password: string) : Promise<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        `${this.sessionsUrl}/sign_in`,
        JSON.stringify({ email, password }),
        { headers }
      ).toPromise()
      .then((response) => {
          let result = response.json().result;
          localStorage.setItem('rest_token', result.rest_token);
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.loggedIn = true;
          this.currentUser = result as User;
          return this.currentUser;
      })
      .catch(this.handleError);
  }

  signOut(): Promise<any> {
    let restToken = localStorage.getItem('rest_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('rest-token', restToken);
    localStorage.removeItem('rest_token');
    localStorage.removeItem('currentUser');

    return this.http
      .post(
        `${this.sessionsUrl}/sign_out`,
        '',
        { headers }
      ).toPromise()
      .then((response) => {
        let result = response.json().result;
        localStorage.removeItem('rest_token');
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
