const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'mongodb_project';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  console.log('Connected successfully to server');
  

  // the following code examples can be pasted here...

  return db;
}

module.exports = main();