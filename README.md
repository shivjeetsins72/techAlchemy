# TechAlchemy weather and news application

## Overview
This application has the user registration, user signin and user signout functionalities.
This appication also has the functionality to fetch news with search feature and also weather forcasts for next 5 days feature which is being fetched from 3rd party apis.

## Presetup
### Database connection
This application uses Mysql database. So make sure you have Mysql installed in your local. To install you can refer this link: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04

Database Connection:
1. Create a mysql database 'testdb' in local
    command: 
    create database testdb;
2. Create user in mysql database and  grant permission to that user   
    command: 
    CREATE USER 'shivjeet'@'localhost' IDENTIFIED BY 'Shivjeets7@@';
    command: 
    GRANT ALL PRIVILEGES ON * . * TO 'shivjeet'@'localhost';
3. To use 3rd party apis you will need ApiKey. I have hardcoded my keys in this application. You can use the same or you can replace them with yours.
4. To insatll all the packages/libraries used:
    command: 
    npm insatll

## Running application
1. command: 
   npm start

## Run Api test 
1. command: 
   npm test

## Postman collection and environment
The postman collection and environment has been added to 'docs' folder. Import them to test all the application endpoints.
