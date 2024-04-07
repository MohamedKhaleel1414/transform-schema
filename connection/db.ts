require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.url).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
    console.log("error occurred!");
});