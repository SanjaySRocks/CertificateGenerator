const { Schema, model } = require('mongoose');

// Create a schema
const CertificateSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    dateIssued: {
        type: Date
    },

    }, {   timestamps: true });

// Create a model using the schema
const Certificate = model('Certificate', CertificateSchema);

module.exports = Certificate;
