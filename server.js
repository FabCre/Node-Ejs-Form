/*********************************************************************
* NODE SERVER with Express, Express.session, Ejs, Bodyparser, Mysql *
*********************************************************************/

// Require de Express js (micro framework npm install --save express)
let express = require('express');

let app = express();

let bodyParser = require('body-parser');

let session = require('express-session');

/******************
* TEMPLATE ENGINE *
******************/

// Template engine ejs used for views (npm install --save ejs)
app.set('view engine', 'ejs');

/*************
* MIDDLEWARE *
*************/

// To manage static files we use the method express use which takes in param a virtual folder then the static method and we pass the path to the folder (see link in the html). This makes it easier to manage the files :)
app.use('/assets', express.static('public'));

// To parse the data of a form
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'clésecretedechiffragedelamort',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // no https so secure is false
}));

// require custom middleware: messageflash and message that is in another folder.
// ATTENTION to the order of use, session must be declared before the messages otherwise it does not exist.
app.use(require('./middlewares/messageflash'));
app.use(require('./middlewares/message'));

/*********
* ROUTES *
*********/

// Get method which takes in parameter the route then a callback with render to send the view
app.get('/', (request, response) => {
  let Message = require('./models/message');
  // findAll method returns an object with the found lines
  Message.findAll(function(messages) {
    console.log('-----Session Start-----');
    console.log(request.session);
    console.log('------Session End------');
    // we add the returned object as a parameter and zoom in on the view to display the data
    response.render('pages/index', { messages: messages });
  });
});

app.get('/about', (request, response) => {
  response.render('pages/about');
});

// Method that handles the post request that comes from the homepage with error handling via flash message middleware
app.post('/', (request, response) => {
  // verification of data (undefined or empty) and sending error
  if (request.body.lastName === undefined || request.body.lastName === '') {
    request.messageflash('error', 'Vous n\'avez pas préciser votre Nom');
    // once the treatments are redirected towards the home
    response.redirect('/');
  } else if (request.body.firstName === undefined || request.body.firstName === '') {
    request.messageflash('error', 'Vous n\'avez pas préciser votre Prénom');
    // once the treatments are redirected towards the home
    response.redirect('/');
  } else if (request.body.message === undefined || request.body.message === '') {
    request.messageflash('error', 'Vous n\'avez pas écrit de message');
    // once the treatments are redirected towards the home
    response.redirect('/');
  } else {
    // Call the model Message (method for sql request)
    let Message = require('./models/message');
    // method create of the class Message that expects the message, the first name, the name and a callback
    Message.create(request.body.message, request.body.firstName, request.body.lastName, function() {
      request.messageflash('good', 'Votre message à bien été envoyé');
      // construction of the data that will be used in 'locals' after processing via middleware message
      request.message('firstName', request.body.firstName);
      request.message('lastName', request.body.lastName);
      request.message('message', request.body.message);
      // once the treatments are redirected towards the home
      response.redirect('/');
    });
  }
});

// treatment of the 404 at the end of the file !
app.use(require('./middlewares/404'));

// Node listens on port 8080 (localhost: 8080)
app.listen(8080);
