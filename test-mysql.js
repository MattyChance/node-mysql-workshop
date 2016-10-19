var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mattychance',
  password : '',
  database : 'addressbook'
});

/*
It is always better to use less javascript to do the work but to use more database
*/
connection.query('show databases', function(err, result) {
    if (err) {
        console.log(err.stack, 'hahaha');
    }
    else {
        console.log(JSON.stringify(result));
    }
    
})