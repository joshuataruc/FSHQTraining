const router = require('express').Router();
const verify = require('./verifyToken');
const Company = require('../models/Company');
const { companyValidation } = require('../validations/companyValidation');


router.post('/insert', verify, async (req, res) => {
    validation
    const { error } = companyValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await Company.findOne({ compEmail: req.body.compEmail });
    if (emailExist) return res.status(400).send('Company Email Already Exist');

    const company = new Company({
        compName: req.body.compName,
        compEmail: req.body.compEmail,
        compAddress: req.body.compAddress,
        compStocks: Math.floor(Math.random() * 100),
        UserId: req.user._id
    });
    try {
        const savedCompany = await company.save();
        res.send('new Company is inserted');
    }
    catch (err) {
        res.status(400).json({ message: err })
    }
    // res.send(req.user)
});


router.delete('/:id', async (req, res) => {
    try {
        const deleteComp = await Company.deleteOne({ _id: req.params.id });
        res.json(deleteComp)
    }
    catch (err) {
        res.status(400).send(err)
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updateComp = await Company.updateOne({ _id: req.params.id }, {$set :{
            compName: req.body.compName,
            compEmail: req.body.compEmail,
            compAddress: req.body.compAddress
            }
        });
        res.send('Updated');
    }
    catch (err) {
        res.status(400).send(err)
    }
});




module.exports = router;