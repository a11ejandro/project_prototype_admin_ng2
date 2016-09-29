import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchParamsProxy } from '../helpers/search-params-proxy'
import { User } from './user';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  error: any;
  params: SearchParamsProxy;

  constructor(private router: Router, private userService: UserService) {
    this.params = new SearchParamsProxy();
    this.params.sortFieldName = 'id';
    this.params.sortOrder = 'asc';
    this.params.searchPhrase = '';
  }

  getUsers(): void {
    this.userService
      .getUsers(this.params.asURLSearchParams())
      .then((result: any) => {
        this.users = result.users as User[];
        this.params.pagination.page = result.pagination.page;
        this.params.pagination.totalPages = result.pagination.totalPages;
        this.params.pagination.updateData();
      })
      .catch(error => this.error = error);
  }

  deleteUser(user: User, event: Event): void {
    event.stopPropagation();
    this.userService
      .delete(user)
      .then(res => {
        this.users = this.users.filter(h => h !== user);
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  go2Page(page: number): void {
    this.params.pagination.setPage(page);
    this.getUsers();
  }

  go2LastPage(): void {
    this.params.pagination.setLastPage();
    this.getUsers();
  }

  toggleSort(fieldName: string): void {
    let currentFieldName = this.params.sortFieldName;

    if(fieldName == currentFieldName) {
      this.params.sortOrder = (this.params.sortOrder == 'asc' ? 'desc' : 'asc');
    } else {
      this.params.sortFieldName = fieldName;
      this.params.sortOrder = 'asc';
    }

    this.getUsers();
  }

  sortOrderClass(fieldName: string): string {
    if(this.params.sortFieldName == fieldName) {
      if(this.params.sortOrder == 'asc') {
        return 'glyphicon glyphicon-sort-by-attributes'
      } else {
        return 'glyphicon glyphicon-sort-by-attributes-alt'
      }
    } else {
      return 'glyphicon glyphicon-sort'
    }
  }
  
  sort(fieldName: string, sortOrder: string): void {
    this.params.sortFieldName = fieldName;
    this.params.sortOrder = sortOrder;
    this.getUsers();
  }
}
