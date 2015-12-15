var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var jade = require('jade');
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('view engine', 'jade');
app.use(bodyParser());
app.use(cookieParser("megaultrasupersecret"));
app.use(session({secret: 'my secret'}));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/logged', function(req, res){
  if (req.cookies.cookie) {
    res.render('logged');
  } else {
    res.redirect('/');
  }
});

app.post('/logged', function (req, res, next) {
    if (req.body.username == '123' && req.body.password == '321') {
    	res.cookie('cookie', 1337);
        res.redirect('/logged');
    } else {
        res.redirect('/');
    }
});

app.post('/exit', function(req, res) {
	res.clearCookie('cookie', 1337);
	res.redirect('/');
})

app.listen(3000, function() {
  console.log('Open "http://localhost:3000"')
});