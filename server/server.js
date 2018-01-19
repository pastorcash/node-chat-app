const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// app.use(bodyParser.json());

// ----- Activate listener ----- //
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  
  module.exports = {app};