const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Company = require("../models/company")
function endOfWeek()
  {
     
    var currentDate = new Date();
    var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toUTCString();
    var lastday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)).toUTCString();
    return firstday,lastday
  }

exports.booking =(req,res,next) => {

    //we update the list of dates to be checked when a booking is made to avoid booking twice the same day
    let dates,id = User.find({_id:req.params.userId}).select('booking_dates').exec()
    .then((result)=> {return result.booking_dates,id})
    .catch((error)=> {console.log(error)})

    const new_dates = dates.push(req.body.date)

    //we count the number of work days per week
    let start_week,end_week = endOfWeek()
    var day_this_week = 0 
    for (i = 0; i < dates.length; i++) {
        if (moment(dates[i]).isBefore(end_week) && moment(end_week-7).isBefore(dates[i])){
            day_this_week +=1
        }
        else if (moment(req.body.date).isBefore(start_week)){
            res.status(400).json({message:"Date before week"})
        }
      }


    User.update({_id:id},{ $set: {booking_dates:new_dates,days_at_work_week:day_this_week} })
    .then (()=>res.status(200).json({message:"user has been updated"}))
    .catch((error)=>{res.status(400).json({err:error})})

}

exports.get_dates= (req,res,next) =>{
    User.find({_id:req.params.userId}).select('booking_dates').exec()
    .then(result => {res.status(200).json({user:result})})
    .catch(error => res.status(404).json({error:error}))
}

exports.get_info = (req, res, next) =>{
    User.find({_id:req.params.userId}).select('booking_dates days_at_work_week team email company first_name last_name').exec()
    .then(result => {res.status(200).json({user:result})})
    .catch(error => res.status(404).json({error:error}))
}

exports.get_all = (req, res, next) =>{
    User.find().select('booking_dates days_at_work_week team email company').exec()
    .then(result => {res.status(200).json({users:result})})
    .catch(error => res.status(404).json({error:error}))
}


exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
        Company.find({name:req.body.company}).exec()
        .then(company=>{
          bcrypt.compare(req.body.company_code,company[0].company_code,(err,result)=>{
            if (err){
              res.status(401).json({message:"Company Error"})
            }
            else if (result){
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error: err
                  });
                } else {
                  const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    joined_on: new Date(Date.now()),
                    team: req.body.team,
                    company: req.body.company
                  });
                  user
                    .save()
                    .then(result => {
                      console.log(result);
                      res.status(201).json({
                        message: "User created"
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({
                        error: err
                      });
                    });
                }
              });

            }
          })
        })
        }
      });
  };


exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
        if (result) {
            const token = jwt.sign(
                {
                    email: user[0].email,
                    userId: user[0]._id
                },
                    "Roquefort-sur-Soulzon", //JWT key
                {
                    expiresIn: "1w"
                }
            );
            return res.status(200).json({
                message: "Auth successful",
                token: token,
                _id:user[0]._id,
                company:user[0].company
            });
        }
        res.status(401).json({
            message: "Auth failed"
        });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};