
const express = require('express');
const app = express();
const morgan = require('morgan');// morgan is sused for logging purposese
const bodyParser = require('body-parser')//to parse the requests (beacuase they ar enot eautiful in node and this makes it easier)
const mongoose = require('mongoose');
const helmet = require('helmet')


const deskRoutes = require('./api/routes/desk')
const userRoutes = require('./api/routes/user');
const companyRoutes = require('./api/routes/company');
const bookingRoutes = require('./api/routes/booking');

app.use(helmet());
const mdp = "lavieestbelle12250"

mongoose
     .connect( "mongodb+srv://test_cluster:" +
    mdp+
     "@cluster0.p12y4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

 //to connect to databse --> mongoose.connect(pathFromMongoDB,) the useMongoClient:true is recommended when using mongoose

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));//this says that we want to parse URLs and that extended (stuff with rich data) is not expected/we don't want to parse it
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
//routes that should handel requests
app.use('/desk',deskRoutes,()=>{console.log("desk")}); // middleware/ products is a filter
app.use('/company',companyRoutes);
app.use('/user',userRoutes);
app.use('/booking',bookingRoutes);


app.use((req,res,next)=>{  //catch errors
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{ //treats all the error of the thingy
    res.status(error.status || 500); //retourne le status de l'errruer ou alors 500
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app; 