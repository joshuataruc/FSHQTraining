const router = require('express').Router();
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const {companyValidation} = require('../validations/companyValidation');
// validation

router.post('/insert', async (req, res) => {

    const {error} = companyValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await Company.findOne({compEmail : req.body.compEmail} );
    if (emailExist) return res.status(400).send('Company Email Already Exist');

    const company = new Company({
        compName: req.body.compName,
        compEmail: req.body.compEmail,
        compAddress: req.body.compAddress,
        compStocks: req.body.compStocks,
        UserId: req.body.UserId,
    });
    try {
        const savedCompany = await company.save();
       res.send('new Company is inserted');
    }
    catch (err) {
        res.status(400).json({ message: err })
    }
});

module.exports = router;