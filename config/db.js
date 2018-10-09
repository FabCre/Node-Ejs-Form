// Require mysql module (cf npm mysql)
let mysql = require('mysql');

// connexion to the BDD
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'node',
  password: 'node',
  database: 'node'
});

connection.connect();
console.log('Connection BDD : OK');

module.exports = connection;
