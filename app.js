/**
 * Core of our program, connects to database, explains how to handle requests, redirects them to Routes file
 * 
 * Author: asirgue
 * Version: 4.0
 */

const express = require('express');
const app = express();
const morgan = require('morgan');// morgan is used for logging purposese
const bodyParser = require('body-parser')//to parse requests 
const mongoose = require('mongoose');
const helmet = require('helmet')

//import our Routes files, to redirect requests to them for request-specific treatment
const deskRoutes = require('./api/routes/desk')
const userRoutes = require('./api/routes/user');
const companyRoutes = require('./api/routes/company');
const bookingRoutes = require('./api/routes/booking');

app.use(helmet());
const mdp = //password not given, this code will not work without it it is on purpose as DB should not be accessed

mongoose
     .connect( "mongodb+srv://test_cluster:" +
    mdp+
     "@cluster0.p12y4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

 //to connect to databse 

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()) //used to parse json


//handles CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

//routes that should handle requests
app.use('/desk',deskRoutes); 
app.use('/company',companyRoutes);
app.use('/user',userRoutes);
app.use('/booking',bookingRoutes);


app.use((req,res,next)=>{  //catch errors
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{ //treats all the error
    res.status(error.status || 500); //returns error status or a default 500 status
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app; 