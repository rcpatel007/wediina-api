var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

var routes = require('./routes/api');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,limit: '100000mb'}));

app.use(express.static(path.join(__dirname,'public')));
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, HEAD, GET, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use('/',routes);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});