require('dotenv').config();

var express = require('express'); 
var app = express(); 
// var test = require('./controllers/testcontroller');
var log = require('./controllers/logcontroller');
var user = require('./controllers/usercontroller');
var sequelize = require('./db');



//routes

sequelize.sync(); //tip: pass in {force: true} for resetting tables

app.use(express.json());

app.use(require('./middleware/headers'));
/****************
 * EXPOSED ROUTES
 ****************/
// app.use('/test', test);

// app.use('/api/user', user);


// app.use('/api/test', function(req,res){
//     res.send("This is data from the api/test endpoint. It's from the server.");
// });

/****************
 * PROTECTED ROUTES
 ****************/
app.use('', user);
app.use(require('./middleware/validate-session'));
app.use('', log);


app.listen(3000,function(){
    console.log('Hey man!! App is listening on 3000') 
});
