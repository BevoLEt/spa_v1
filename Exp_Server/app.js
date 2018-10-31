//GET '127.0.0.1:3000/users/1' -v    0w0
const mongo=require('moongoose')
const express = require('express');
const app = express();
const router=express.Router();
const bodyParser=require('body-parser');
const mongo=require('mongoose');
const ip='155.230.34.149';
const port=3000;
//test


app.listen(port,ip, () => {
  console.log('ip : '+ip+' port number : '+port);
  console.log('DKE LAB SPA Server'); 
});

//---- mongo db connect ---////
// connect to MongoDB / the name of DB is set to 'myDB_1'
mongo.connect('mongodb://localhost/Exp_Test');
// we get the pending connection to myDB running on localhost
var db = mongo.connection;
// we get notified if error occurs
db.on('error', console.error.bind(console, 'connection error:'));
// executed when the connection opens
db.once('open', function callback () {
    // add your code here when opening
      console.log("mongodb open");
});

function createmongoSchema(){
	temps=
}




//app.user
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users',require('./api/user'));


module.exports = app;


