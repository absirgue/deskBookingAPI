const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Desk = require("../models/desk");
const Company = require("../models/company");
const Booking = require("../models/booking")

exports.find_desk=(req, res, next) =>{
  Company.find({"_id":req.body.company}).exec()
  .then(comp=>{
    let company = comp[0]
    const max_desk_occupancy = company.max_desk_occupancy
    const date_right= req.body.date+"T00:00:00.000+00:00"
    Booking.find({"date":date_right,"company":req.body.company}).exec()
    .then(bookings=>{
      console.log("we're here")
      console.log(max_desk_occupancy)
      console.log(bookings)
      console.log(bookings.length)
      if (bookings.length<max_desk_occupancy){
        console.log('maximum occupany is not reached ')
        const date_formated = req.body.date +"T00:00:00.000+00:00"
        console.log(date_formated)
        Desk.find({'dates_occupied': {$nin: [date_formated]}}).exec()
        .then( desks =>{
            var checking_done = 0
            for (i = 0; i < desks.length; i++){
                if (desks[i].f_preference == req.body.f_preference && desks[i].s_preference == req.body.s_preference){
                    res.status(200).json({id:desks[i]._id,locator:desks[i].locator,address:desks[i].address})
                    checking_done = 1
                    
                }
            }
            console.log("first check done")
            if (checking_done == 0){
                for (i = 0; i < desks.length; i++){
                    if (desks[i].f_preference == req.body.f_preference || desks[i].s_preference == req.body.s_preference){
                        res.status(200).json({id:desks[i]._id,locator:desks[i].locator,address:desks[i].address})
                        checking_done = 1
                        
                    }
                }
            }
            console.log("second check done")
            if (checking_done==0){
                res.status(200).json({id:desks[i]._id,locator:desks[i].locator,address:desks[i].address})
                console.log("last check done")
            }
        })
        .catch(error=>{res.status(400).json({err:"error finding desks"})})
      }
      else{
        console.log('maximum occupancy reached')
        res.status(303).json({error:"max occupancy reached on this date"})
      }
    }).catch(err=>{
      const date_formated = req.body.date +"T00:00:00.000+00:00"
      console.log(date_formated)
      Desk.find({'dates_occupied': {$nin: [date_formated]}}).exec()
        .then( desks =>{
            var checking_done = 0
            for (i = 0; i < desks.length; i++){
                if (desks[i].f_preference == req.body.f_preference && desks[i].s_preference == req.body.s_preference){
                    res.status(200).json({id:desks[i]._id,locator:desks[i].locator,address:desks[i].address})
                    checking_done = 1
                    
                }
            }
            console.log("first check done")
            if (checking_done == 0){
                for (i = 0; i < desks.length; i++){
                    if (desks[i].f_preference == req.body.f_preference || desks[i].s_preference == req.body.s_preference){
                        res.status(200).json({id:desks[i]._id,locator:desks[i].locator,address:desks[i].address})
                        checking_done = 1
                        
                    }
                }
            }
            console.log("second check done")
            if (checking_done==0){
                res.status(200).json({id:desks[i]._id,locator:desks[i].locator,address:desks[i].address})
                console.log("last check done")
            }
        })
        .catch(error=>{res.status(400).json({err:"error findind desks"})})
      })
  .catch(err=>{res.status(400).json({error:"No company found"})}) 
  })

}


exports.book_desk=(req, res, next) =>{ //deskId
    Desk.findById(req.params.deskId).exec()
    .then(desk=>{
            Desk.updateOne({_id:req.params.deskId},{ $push: {dates_occupied:req.body.date} }).exec().then(()=>res.status(200).json({message:'DONE yes '})).catch(err=>{res.status(400).json({error:err})})
        
    })
}


exports.create_desk=(req, res, next) =>{
    Desk.find({ locator: req.body.locator })
    .exec()
    .then(desk => {
      if (desk.length >= 1) {
        return res.status(409).json({
          message: "Desk exists"
        });
      } else {
            const desk = new Desk({
                _id: new mongoose.Types.ObjectId(),
                locator:req.body.locator,
                f_preference: req.body.f_preference,
                s_preference:req.body.s_preference,
                text:req.body.text,
                address:req.body.address,
                company:req.body.company
            });
            desk
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Desk created"
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