var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'instanetwork.ca',
  user     : 'hydtek',
  password : 'T3lephone',
  database : 'instanetwork'
});
console.log('testt!');
connection.connect();

console.log('hey!');
connection.query('SELECT * from users', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();
