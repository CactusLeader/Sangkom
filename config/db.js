const mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USER_PASS +
    "@cluster0.gj1m0.mongodb.net/socialize?retryWrites=true&w=majority",
  options,
  function (err) {
    if (err) {
      console.log("Failed to connect to MongoDB", err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
