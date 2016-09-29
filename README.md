# Project Prototype admin client powered by Angular 2#
It is based on [Angular 2 QuickStart](https://github.com/angular/quickstart) 

Developed for back-end part of https://github.com/a11ejandro/project_prototype.

Implements admin panel with ability to view and edit users. 

## Installation ##

1. *clone* this repo
2. *cd*
3. ./install.sh
4. Answer questions
5. Add remotes

## Usage notes ##
* Client uses BackendInterceptor to handle token errors. It can be found at app/helpers/backend-interceptor.ts
* Application-wide and host-dependant constants are set in ConfigService, which is located at app/config.service.ts.

## Possible improvements ##
1. Setup a service to display alert message
2. Handle more server errors
3. Cover existing functionality with tests

Feel free to send pull requests on any other reasons.
