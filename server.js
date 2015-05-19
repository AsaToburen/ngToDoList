var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  io = require('socket.io'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  port = process.env.PORT || 8080,
  database = require('./config/database');

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(methodOverride());

require('./app/routes.js')(app);

io.listen(app.listen(port));

console.log('Listening on port ' + port);
