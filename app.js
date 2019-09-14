var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

var routes = require('./routes/api');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '100000mb' }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});