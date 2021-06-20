const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookingSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId, //you define each parameter by the name and then the data type
    desk:{type:Schema.Types.ObjectId,ref:'Desk',required:true},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    date:{type:Date,required:true},
    registered_on:{type:Date},
    company:{type:String,required:true}

});

//schema is the layout, the design of the object and the model is the constructor of the objects!

module.exports = mongoose.model('Booking',bookingSchema);//the first one is the name of the model you want to use internally and the second is th schema of the model