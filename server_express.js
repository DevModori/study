// es6 : require --> import

import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import session from 'express-session';
import fs from 'fs';

let app = express();

/*
let server = app.listen(3000, function() {
    console.log("Express sesrver has started on port 3000");
})

app.get('/', function(req, res) {
    res.send('Hello World');
})
*/

app.set('veiws', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
    console.log("Express server has started on port 3000")
})

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '1234QWER!@#$',
    resave: false,
    saveUninitialized: true
}));

var router = require('./router/main') (app, fs);