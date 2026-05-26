
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoDb = require('mongodb');

require('dotenv').config();


// To make Executable Function
const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());
server.use(cors());

server.get('/',(request,response) => {
    response.send('<h1>server is working..</h1>');
})

// Admin URL

require('./src/routes/admin-panel/default.routes')(server);

// Application URL


//Website URL

require('./src/routes/website/user.routes')(server);
require('./src/routes/website/order.routes')(server);



server.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'))
  .catch((error) => {
    console.log(error);
  })
    console.log('server is working fine...');
})
