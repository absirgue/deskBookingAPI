/**
 * Model of elements of Company Collection in our Database
 * 
 * Author: asirgue
 * Version: 4.0
 */

const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId, 
    name:{type:String, required:true},
    teams:[{type:String}],
    total_nb_employees: {type:Number},
    nb_of_desks:{type:Number, required:true},
    address_of_offices:[{type:String}],
    max_desk_occupancy:{type:Number, required:true},
    amount_per_month:{type:Number},
    options:[{type:String}],
    company_code:{type:String,required:true},
    preferences:[{type:String,required:true}]
});

//schema is the layout, the design of the object and the model is the constructor of the objects!

module.exports = mongoose.model('Company',companySchema);//the first one is the name of the model you want to use internally and the second is th schema of the model