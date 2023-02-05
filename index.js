const express = require('express');
// express is the name of a NodeJS module, NodeJS provides the "require" function so this provides the require of express module to run this application.
const db = require('./config/connection'); // connection to mongoose database
const routes = require('./routes'); // connection to routes which are used later for modifying database

const cwd = process.cwd(); // Returns the current working directory

const PORT = process.env.PORT || 3001;
// Local host will default to 3001, but when deploying the process.env.PORT will provide whatever port is available
const app = express();
// Calls the express function "express()" and creates a new expression application inside the variable named "app"

// // Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes('01-Activities')
//   ? cwd.split('/01-Activities/')[1]
//   : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => { // once the database is open then the app is listening on port stated - application has started
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
