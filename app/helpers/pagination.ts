export class Pagination {
  page: number;
  totalPages: number;
  pages: number[];

  constructor() {
    this.page = 1;
    this.totalPages = 1;
  }

  setPage(pageNumber: number): void {
    if(pageNumber > this.totalPages) {
      this.page = this.totalPages;
    } else if(pageNumber < 1) {
      this.page = 1;
    } else {
      this.page = pageNumber;
    }
  }

  setLastPage(): void {
    this.page = this.totalPages;
  }

  updateData(newPages: number[] = []): void {
    if(newPages.length == 0) {
      this.pages = (new Array(this.totalPages)).fill(1).map(function(value, index){ return index + 1; });
    } else {
      this.pages = newPages;
    }
  }
}
