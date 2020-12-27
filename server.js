const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserAuth = require('./models/UserAuth')

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL,
    { useUnifiedTopology: true, useNewUrlParser: true  },
    () => console.log('Database Connected!'))



app.listen(process.env.PORT, () =>{
    console.log(`server is running: http://localhost:${process.env.PORT}`);
})