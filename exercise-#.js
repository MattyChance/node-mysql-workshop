var mysql = require("mysql");
var Table = require("cli-table");


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'mattychance',
  password: '',
  database: 'addressbook'
});



//Exercise 1:

// connection.query('show databases', function(err, result) {
//   if (err) {
//     console.log(err.stack, 'hahaha');
//   }
//   else {
//     var table = new Table();
//     result.forEach(function (database) {
//       table.push(database);
//     });
//     console.log(table.toString());
//   }
  
//   connection.end();
// });

/*
Exercise 2: Getting back our data

1. Write a program that fetches the first 5 accounts in the addressbook database
2. For each account, console.log a line with the account's ID and email, like this: #1:email@domain.com
3. Use the colors NPM module with the .bold option to achieve this effect
*/
// var query1 = `SELECT * FROM Account LIMIT 5`; 

// connection.query(query1, function(err, result) {
//   if (err) {
//     console.log(err.stack, 'haha, sth went wrong');
//   }
//   else {
//     console.log(JSON.parse(JSON.stringify(result)));
//   }
//   connection.end();
// });

/*
Exercise 3: Joining up the data, part 1

1. Write a program that fetches all the accounts and their addressbooks.
2. Output one line for each account as in Exercise 4, followed by a listing of all the address book names for that account, one per line
3. Make the output look nice in any way you like
*/
var query2 = `SELECT a.id, a.email, GROUP_CONCAT(ab.name) AS addressbooks 
FROM AddressBook ab 
RIGHT JOIN Account a 
ON a.id = ab.accountId
GROUP BY a.id;
`; 

connection.query(query2, function(err, result) {
  if (err) {
    console.log(err.stack, 'haha, sth went wrong');
  }
  else {
    //console.log(JSON.parse(JSON.stringify(result)));
    result.forEach(function(account) {
      console.log('#' + account.id + ': ' + account.email);
      // console.log(account.addressbooks);
      (account.addressbooks === null ) ? console.log('--no addressbook--') : console.log(account.addressbooks);
    });
  }
  // console.log(result);
  connection.end();
});

/*
Exercise 4: More about joins...

Notice that for the previous exercise, Account #5 did not appear in the listing. Don't come back here until you have re-checked the previous exercise and noticed for yourself that Account #5 is missing.
The reason for this is because Account #5 does not have any AddressBook, so doing the JOIN left it out.
Read and understand this article on SQL JOINs, more specifically about the LEFT JOIN.
Based on your new understanding, create a similar program to Exercise #4.
The only difference, if an account does not have any address book, print it like this:
#3: xxx@yyy.com
  --no address books--
*/

//Challenge:
/*
var queryChallenge = `select a.id as accountId, a.email, ab.id as addressbookId, ab.name, e.id as entryId, e.firstName, e.lastName
from Account a LEFT OUTER JOIN AddressBook ab ON (a.id = ab.accountId) 
LEFT OUTER JOIN Entry e ON (ab.id = e.addressbookId)
limit 10
`; 

connection.query(queryChallenge, function(err, result) {
  if (err) {
    console.log(err.stack, 'haha, sth went wrong');
  }
  else {
    result.reduce(function (prev, curr, idx, arr) {
      if (curr['accountId'] !== prev['accountId']) {
        
        
        
      }
    }, []);
    
    // var test1 = result.map(function (curr) {
    //   var obj = {};
    //   obj['accountId'] = curr.accountId;
    //   obj['email'] = curr.email;
    //   // obj['addressbooks'] = [].push('placeholder');
    //   return obj;
    //});
    console.log(result);
  }
  connection.end();
});
*/