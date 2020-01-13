// es6 : require --> import

import express from 'express';
let app = express();

/*
let server = app.listen(3000, function() {
    console.log("Express sesrver has started on port 3000");
})

app.get('/', function(req, res) {
    res.send('Hello World');
})
*/

var router = require('./router/main') (app);

app.set('veiws', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
    console.log("Express server has started on port 3000")
})