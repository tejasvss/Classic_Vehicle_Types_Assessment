const mongoose = require('mongoose');
const validator = require('validator');


module.exports = connectToDatabase = () => {

    mongoose.connect("mongodb+srv://teja1997:WxLlbHz1jY1sJSsh@cluster0.cz1dd.mongodb.net/ASSESSMENT?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("Connected To Mongo DB ATLAS");
            console.log("Connection:OK");
            console.log("DB:Mongo DB ATLAS")
            console.log("*******************************************");
        }).catch(err => {
            console.log(err)
            console.log("Unable to Connect .Something went Wrong")
            console.log("*******************************************");
        })
}