## Catasys Patient Assessment Application

# Instruction to run this application

Step:1 git clone https://github.com/loftywaif002/catasys-assessment-app.git<br />
Step:2 cd catasys-assessment-app<br />
step:3 npm install<br />
step:3 npm start<br />

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Possible improvements

1. Currently all logic is in App.js, we should separate components into different files for reusability<br />
2. App is not connected to any database, it is using local state array to store patient history, a database should be used for persistency<br />
3. Error boundaries can be used to implement Client side validation check user input on all fields an show error on the UI in a user friendly manner when user input is not acceptable<br />
4. Unit test can be implemented for each modulec / component.<br />
5. Cypress can be used to automate end-to-end user functionality.<br />
