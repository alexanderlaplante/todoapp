// Load variables from .env into process.env
// In production, you'd configure these either in the command line or using your server's GUI
require('dotenv').config();

import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as validator from 'express-validator';
import * as morgan from 'morgan';

import { connect } from './mongo.connect';
import { personController } from './person.controller';
import { userController } from './user.controller';
import { errorHandler } from './utils';

const app: Express = express();
const MongoStore = require('connect-mongo')(session);

// app.set() simply stores variables on the express server object - use app.get('myvariable') to retrieve it
app.set('port', 4000);

// bodyParser adds the "body" property to any Request being sent via POST or PUT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helmet adds a bunch of boilerplate security measures
app.use(helmet());

// Adds validation methods like isEmpty() and isInt() to the Request and Response objects
app.use(validator());

// A logging library - will console.log HTTP requests in an easily readable way
app.use(morgan('dev'));

// Removes 'x-powered-by: express' from headers to decrease chances of express-specific attacks
app.disable("x-powered-by");

// Stores user sessions in the database - not being used until we add authentication
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    ttl: 14 * 24 * 60 * 60, // 2 weeks
  }),
}));

// API routes

app.post('/user', userController.create);
app.get('/user/:id', userController.get);
app.put('/user/:id', userController.update);
app.delete('/user/:id', userController.delete);

app.post('/person', personController.create);
app.get('/person/:id', personController.get);
app.put('/person/:id', personController.update);
app.delete('/person/:id', personController.delete);

// Every mongodb document has a unique "_id" property, which is of BSON type ObjectId
// When it's translated to JSON, ObjectIds turn into strings, since there's no ObjectId type in JSON
// Mongoose also allows you to look up ObjectIds just using their string values
// For all intents and purposes, think of _id as a string
// Example of a Person document as you'd see it in the database CLI:
// {
//     _id: ObjectId("507f1f77bcf86cd799439011"),
//     name: "Danny",
//     age: 25,
//     isEngineer: true
// }
// In JSON, it will look like:
// {
//     _id: "507f1f77bcf86cd799439011",
//     name: "Danny",
//     age: 25,
//     isEngineer: true
// }

// Wildcard route (must be after all other routes)
app.get('*', (req, res) => {
    res.status(404).send("Nothing here!");
});

// Handle errors
app.use(errorHandler); // needs to be set after our routes

// Connect to the database, start the server
connect(() => {
    app.listen(app.get('port'));
    console.log("Listening on port " + app.get('port'));
});
