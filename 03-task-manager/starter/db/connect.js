const mongoose = require('mongoose');

const connectDB = (url) => {
   return  mongoose.connect(url, {
        // mongoose v6 kullanırsan , bunları yazmaya gerek yok !
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
}

module.exports = connectDB;