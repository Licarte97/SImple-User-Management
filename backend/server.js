const express = require('express');
const app = express();
const cors = require("cors");
const userRoutes = require('./routes/user.routes');
const PORT = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });
const mongoose = require('mongoose')
const { errorHandler } = require('./middleware/errorMiddleWare');
const connectDB = require('./db/connection');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    // res.send({ server_status: "running" })
    res.json({ server_status: "running" })

})

app.use('/api/users', userRoutes)

app.use(errorHandler);

// app.use('/api', testRoutes);

app.listen(PORT, () => {
    //connect to DB
    connectDB();

    console.log("Server running at port " + PORT)
});