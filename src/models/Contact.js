import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let newContact = new Schema({
    "nom": { type: String, required: true },
    "prenom": { type: String, required: true },
    "entreprise": { type: String, required: true },
    "email": { type: String, required: true},
    "adresse": { type: String, required: true },
    "telephone": { 
        mobile: Number,
        work: Number

     },

}, { versionKey: false });


module.exports = mongoose.model('Contact', newContact);