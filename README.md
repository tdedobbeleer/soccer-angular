# Angular soccer

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular/cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Local environment
Debian env:
- curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - & sudo apt-get install -y nodejs
- sudo apt-get install npm
- sudo npm install npm@latest -g (latest nodejs version)
- sudo npm install -g angular/cli@latest

Install dependencies:
- npm install

Update all dependencies at once
- sudo npm install -g npm-check-updates
- ncu -u

Run the server
- ng serve

## Accident help
If ng serve does not work, update all depenencies, throw away the node modules folder and use the npm install commando again. Using the latest packages should always work.