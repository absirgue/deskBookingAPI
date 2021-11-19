/**
 * All functions for company related requests
 * Company related requests are:
 * Creating a Company
 * Getting info about a Company
 * 
 * Author: asirgue
 * Version: 4.0
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Company = require("../models/company");

//POST - creates a company with a company code given when company user registers with us
exports.create_company = (req, res, next) => {
    Company.find({ name: req.body.name })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Company exists"
          });
        } else {
          bcrypt.hash(req.body.company_code, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
                var company_name = req.body.name
                var capital_company_name = company_name.toUpperCase()
              const company = new Company({
                _id: new mongoose.Types.ObjectId(), //you define each parameter by the name and then the data type
                name:capital_company_name,
                teams:req.body.teams || [],
                total_nb_employees: req.body.total_nb_employees,
                nb_of_desks:req.body.nb_of_desks,
                address_of_offices:req.body.address_of_offices || [],
                max_desk_occupancy:req.body.max_desk_occupancy,
                amount_per_month:req.body.amount_per_month || 12,
                options:req.body.options || [],
                company_code:hash,
              });
              company
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "Company created"
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
      });
  };

//GET - get infos about a specific company
exports.get_info = (req,res,next)=>{
    Company.findById(req.params.companyId).select("name _id teams total_nb_employees nb_of_desks max_desk_occupancy address_of_offices max_desk_occupancy amount_per_month options preferences").exec()
    .then(company => {res.status(200).json({company_info:company})})
    .catch(err => {res.status(400).json({error:err})})
}

