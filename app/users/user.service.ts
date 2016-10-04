import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { User } from './user';
import { ConfigService } from '../config.service'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private usersUrl = 'admin/users';  // URL to web api
  private headers = new Headers();

  constructor(private http: Http, private config: ConfigService) {
    this.usersUrl = config.getApiEndpoint() + this.usersUrl;

    let authToken = localStorage.getItem('auth_token');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('auth-token', authToken);
  }

  getUsers(params: URLSearchParams): Promise<Object> {
    return this.http
      .get(this.usersUrl, {headers: this.headers, search: params})
      .toPromise()
      .then(response => response.json().result as any)
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    return this.http
      .get(`${this.usersUrl}/${id}`, {headers: this.headers})
      .toPromise()
      .then(response => response.json().result as User)
      .catch(this.handleError);
  }

  save(user: User): Promise<User> {
    if (user.id) {
      return this.put(user);
    }
    return this.post(user);
  }

  delete(user: User): Promise<Response> {
    let url = `${this.usersUrl}/${user.id}`;

    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  putAvatar(user: User, avatar: File): Promise<User> {
    let url = `${this.usersUrl}/${user.id}`;
    let formData: FormData = new FormData();
    formData.append("avatar", avatar, avatar.name);
    let headers = new Headers();
    headers.append('auth-token', localStorage.getItem('auth_token'));
    headers.append('Content-Type', undefined);

    return this.http
      .put(url, formData, {headers: headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  // Add new User
  private post(user: User): Promise<User> {
    return this.http
      .post(this.usersUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing User
  private put(user: User): Promise<User> {
    let url = `${this.usersUrl}/${user.id}`;

    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
