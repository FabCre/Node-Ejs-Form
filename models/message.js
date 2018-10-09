// Creating a Message (model) class for database calls

let connection = require('../config/db');

class Message {
  // Insert Form Data in the database
  static create(message, firstname, lastname, callback) {
    connection.query('INSERT INTO messages SET message = ?, date = ?, firstname = ?, lastname = ?', [message, new Date(), firstname, lastname], (error, result) => {
      // returns console errors (server terminal)
      console.log(error + ' erreur sur la méthode Create');
      callback(result);
    });
  }

  // Read all messages from the database
  static findAll(callback) {
    connection.query('SELECT * FROM messages', (error, result) => {
      // returns console errors (server terminal)
      console.log(error + ' erreur sur la méthode FindAll');
      callback(result);
    });
  }
}

module.exports = Message;
