const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Booking = require("../models/booking");
const Company = require("../models/company");

exports.create_booking=(req, res, next) =>{
    const booking = new Booking({
        _id: mongoose.Types.ObjectId(),
        desk:req.body.desk,
        user:req.body.user,
        date: req.body.date,
        registered_on: new Date(Date.now()),
        company:req.body.company
      });
      booking.save()
      .then(result => {
          console.log(result);
          res.status(201).json({
            message: "booking saved"  
  
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
}


exports.get_user_booking=(req, res, next) =>{
    Booking.find({"user":req.params.userId}).populate("desk user").exec()
    .then(bookings=>{
        res.status(200).json({bookings_for_this_user:bookings})
    })
    .catch(err=>{res.status(400).json({error:err})})
}

exports.get_bookings=(req, res, next) =>{
    Booking.find({"company":req.params.companyId}).populate("desk user").exec()
    .then(bookings=>{
        res.status(200).json({bookings:bookings})
    })
    .catch(err=>{res.status(400).json({error:err})})
}

