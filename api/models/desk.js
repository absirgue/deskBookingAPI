/**
 * Model of elements of Desk Collection in our Database
 * 
 * Author: asirgue
 * Version: 4.0
 */

const mongoose = require('mongoose');

const deskSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId, 
    locator:{type:String, required:true},
    f_preference: {type:Boolean, required:true},
    s_preference:{type:Boolean, required:true},
    dates_occupied:[{type:Date}],
    text:{type:String},
    address:{type:String,required:true},
    company:{type:String, required:true}
});

//schema is the layout, the design of the object and the model is the constructor of the objects!

module.exports = mongoose.model('Desk',deskSchema);//the first one is the name of the model you want to use internally and the second is th schema of the model