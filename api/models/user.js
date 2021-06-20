const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId, //you define each parameter by the name and then the data type
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{type:String, required:true},
    team:{type:String,required:false},
    company:{type:String,required:true},
    days_at_work_week:[{type:Date}],
    booking_dates:[{type:Date}]
});

//schema is the layout, the design of the object and the model is the constructor of the objects!

module.exports = mongoose.model('User',userSchema);//the first one is the name of the model you want to use internally and the second is th schema of the model