/**
 * Routes of User request, linked to function of '../controllers/user.js'
 * 
 * Author: asirgue
 * Version: 4.0
 */

const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const UserControllers = require('../controllers/user');

router.post('/login',UserControllers.user_login);

router.post('/signup',UserControllers.user_signup);

router.post('/:userId/booking',checkAuth,UserControllers.booking);

router.get('/:userId/dates',checkAuth,UserControllers.get_dates)

router.get('/:userId/infos',checkAuth,UserControllers.get_info)

router.post('/find_user_invite',checkAuth,UserControllers.find_user_invite)

router.get('/get_all',checkAuth,UserControllers.get_all)



module.exports = router;
