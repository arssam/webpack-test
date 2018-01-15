var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config');
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
}));

app.use(express.static(path.join(__dirname, 'src')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(3457, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3457');
});

opn('http://localhost:3457','chrome');
