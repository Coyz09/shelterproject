const express = require('express');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'PRODUCTION') 
    require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json());

app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors(corsOptions));

const injuries = require('./routes/injury');
const auth = require('./routes/auth');
const personnels = require('./routes/personnel');
const animals = require('./routes/animal');
const adopters = require('./routes/adopter');


app.use('/api/v1', injuries);
app.use('/api/v1', personnels);
app.use('/api/v1', adopters);
app.use('/api/v1', animals);
app.use('/api/v1', auth);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
app.use(errorMiddleware);

module.exports = app