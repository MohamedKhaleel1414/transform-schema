require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.url).then(function () {
    console.log("Database Connected");
}).catch(function (err) {
    console.log(err);
    console.log("error occurred!");
});
