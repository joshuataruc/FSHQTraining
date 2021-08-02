const express = require('express');
const AuthRoute = require('./routes/auth');
const CompanyRoute = require('./routes/company');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv/config');

const app = express();

app.use(bodyParser.json());

// route middleware
app.use('/api/user', AuthRoute);
app.use('/api/company', CompanyRoute);

// db connection
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true , useUnifiedTopology: true },
    () => console.log('Database is Connected')
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on localhost:${PORT}`))