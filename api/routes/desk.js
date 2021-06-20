const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')


const DeskControllers = require('../controllers/desk');

router.get('/find_desk',checkAuth,DeskControllers.find_desk);

router.post('/:deskId/book_desk',checkAuth,DeskControllers.book_desk);

router.post('/create_desk',checkAuth,DeskControllers.create_desk);



module.exports = router;