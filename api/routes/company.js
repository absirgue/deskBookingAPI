const express = require("express");
const router = express.Router();


const CompanyControllers = require('../controllers/company');

router.get('/:companyId/infos',CompanyControllers.get_info);

router.post('/create_company',CompanyControllers.create_company);



module.exports = router;