const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

//schema for Admin model//////////////////////////////////////////////////////
const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    userRole: { type: String }
});
schema.plugin(timestamps);
schema.set('toJSON', { virtuals: true });
//export to use this model in entire project/////////////////////////////////
module.exports = mongoose.model('Admin', schema);