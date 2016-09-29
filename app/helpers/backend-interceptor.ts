import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


export class BackendInterceptor extends XHRBackend {
  constructor(_browserXhr: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy) {
    super(_browserXhr, _baseResponseOptions, _xsrfStrategy);
  }

  createConnection(request: Request) {
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.map(res => {

      let json = res.json();
      console.log('intercepting...');
      console.log(json.status);
      console.log(json.success);

      if(json.success == false && json.status == 401) {
        window.location.pathname = '/sign_in';
        return Observable.throw(new Error(json.result));
      }

      return res;
    })

    return xhrConnection;
  }

}
