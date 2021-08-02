const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { userRegisterValidation, loginValidation } = require('../validations/userValidation');
const { valid } = require('@hapi/joi');

router.post('/register', async (req, res) => {

    // validation for new user using @hapi/joi
    const { error } = userRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if email exist
    const userEmailExist = await User.findOne({ email: req.body.email });
    if (userEmailExist) return res.status(400).send('Email already exist');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //res.send(hashedPassword);


    //creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const SavedUser = await user.save();
        res.send('saved');
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post('/login', async (req, res) =>{
    //validating the user input
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if email !exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    res.send('Logged In!')



});

module.exports = router;