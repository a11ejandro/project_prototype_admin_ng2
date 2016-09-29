import { Injectable } from '@angular/core';

@Injectable()

// Provides global and host-dependant information
export class ConfigService {
  private apiEndpoint = '';
  private apiHost = '';

  constructor() {
    let host = window.location.host;

    switch(host) {
      // Add more hosts here. E.G:
      /*
      case 'my-domain.com':
            this.apiEndpoint = 'api.my-domain.com/api/v1/';
            break;
      */
      default:
          this.apiHost = 'http://localhost:3000';
          this.apiEndpoint = this.apiHost + '/api/v1/'; // Fallback to development API server
    }
  }

  getApiEndpoint(): string {
    return this.apiEndpoint;
  }

  getApiHost(): string {
    return this.apiHost;
  }
}
