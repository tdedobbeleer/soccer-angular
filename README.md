Soccer Angular 2 GUI 
===================

[![Build Status](https://travis-ci.org/tdedobbeleer/soccer-angular.svg?branch=master)](https://travis-ci.org/tdedobbeleer/soccer-angular)
<br>

This is a GUI built for using the [Soccer API](https://github.com/tdedobbeleer/soccer-ws). This guide will explain how to deploy the code on [Firebase](https://firebase.google.com) and maybe explain how this GUI works. Maybe.

----------

# Table of Contents

[1. Local deploy](#local-deploy)

[2. Firebase deploy](#firebase-deploy)

## Local deploy (Debian environment)
### Install prerequisites
First of all, you need nodejs. Use the nvm script tool:

    https://github.com/creationix/nvm
 
 Install npm & node:
 
    nvm install $version (eg: 10.5.0)   

Install Angular CLI. Make sure you have the same version or higher than used by the project. Check the package.json file to know which version you need:

    sudo npm install -g @angular/cli@$version

Now, you should be able to run the server:

    ng serve

That's it.

### First aid
If you switch CLI's, you'd better remove the node_modules folder to remove all dependencies. Use `npm install` to reinstall dependencies.
To update all dependencies at once, you can use npm-check-updates. Handy for updating dependencies:

    sudo npm install -g npm-check-updates
    ncu -u

## Firebase deploy
### Prerequisites
Make sure you have the following tools installed:

 - Angular CLI

### How to begin
If you don't have a Google account, which is very unlikely, create one first. Then go to [Firebase](https://firebase.google.com) and create your first project. There is no GUI to deploy the code (yet), so next up is using the firebase CLI.

### Deploy code using the Firebase CLI
Install the [Firebase CLI](https://firebase.google.com/docs/cli/) first and I suggest you read the docs as well.
    
    sudo npm install -g firebase-tools

Then, log into Firebase:

    firebase login
    
Next, select the project you are using:

    firebase use $project_name
    
If you want to deploy, make sure you are in the main dir, build the app and deploy to Firebase:

    ng build --aot --prod --environment=$environment && firebase deploy --only hosting

> **Note:**
> The environment is specified because the app knows the default, quality and production environment. You can add more environments if needed (in src/environments). These environments contain settings per environment (duh).
