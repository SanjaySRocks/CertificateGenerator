const mongoose = require('mongoose');


const dbURI = `mongodb+srv://220159:220159password@cluster0.0ipredr.mongodb.net/certificate_app?retryWrites=true&w=majority`;
const localdbURI = `mongodb://localhost:27017/certificate_app?retryWrites=true&w=majority`;


async function connectToDatabase() {

    try{
        await mongoose.connect(localdbURI);
        console.log("Connected to mongodb certificate_app database!")
    }
    catch(err)
    {
        console.log("Database error: ",err);
    }
}

module.exports = { connectToDatabase };