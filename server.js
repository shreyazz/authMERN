const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectToDB = require('./db/conn');
// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'))
// defining port
const PORT = process.env.PORT || 3001;

// connect to DB
connectToDB();
// Starting Server on PORT
app.listen(PORT, () => console.log("Server started on PORT Number: " + PORT));
