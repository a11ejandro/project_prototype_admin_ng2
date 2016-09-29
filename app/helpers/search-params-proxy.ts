import { Pagination } from "./pagination";
import { URLSearchParams } from "@angular/http"

// Convinient proxy for URLSearchParams
export class SearchParamsProxy {
  searchPhrase: string;
  sortFieldName: string;
  sortOrder: string;
  pagination: Pagination;

  constructor() {
    this.pagination = new Pagination();
  }

  asURLSearchParams(): URLSearchParams {
    let params = new URLSearchParams();
    params.append('page', String(this.pagination.page));
    params.append('totalPages', String(this.pagination.totalPages));
    params.append('sortFieldName', this.sortFieldName);
    params.append('sortOrder', this.sortOrder);
    params.append('searchPhrase', this.searchPhrase);

    return params;
  }
}
