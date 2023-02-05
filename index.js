const express = require('express');
// express is the name of a NodeJS module, NodeJS provides the "require" function so this provides the require of express module to run this application.
const db = require('./config/connection'); // connection to mongoose database
const routes = require('./routes'); // connection to routes which are used later for modifying database

const PORT = process.env.PORT || 3001;
// Local host will default to 3001, but when deploying the process.env.PORT will provide whatever port is available
const app = express();
// Calls the express function "express()" and creates a new expression application inside the variable named "app"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => { // once the database is open then the app is listening on port stated - application has started
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});


// CREATE - .create
// READ - .find({ _id: req.params.id })
// UPDATE - .findOneAndUpdate({ _id: req.params.id })
// DELETE - .findOneAndRemove({ _id: req.params.id })

// E3MrP3PPr01BDkgx

// mongodb+srv://demo:E3MrP3PPr01BDkgx@challenge18socialnetwor.ucemfo5.mongodb.net/SocialDB?retryWrites=true&w=majority
