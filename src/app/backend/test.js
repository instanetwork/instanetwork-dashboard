var subscriptionModule = {};

subscriptionModule.getAll = function (cb) {

  var mysql = require('mysql');
  var settings = require('./settings.json');

  db = mysql.createPool(settings);

  db.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT * from subscription where id = 213', function(err, rows) {
      console.log('yooo');
      if (!err)
        console.log('The solution is: ', rows);
      else
        console.log('Error while performing Query.');
      // And done with the connection.
      connection.release();

      cb(err,rows);
      // Don't use the connection here, it has been returned to the pool.
    });
  });

};

exports.subscriptionModule = subscriptionModule;
