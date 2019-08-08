
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema for Device model//////////////////////////////////////////////////////
const schema = new Schema({
    deviceName:{type: String, required:true},
    deviceType:{type:String, required: true},
    deviceAction:[{restartDevice:Boolean, powerOffOn:Boolean}],
    createdAt: { type: Date, default: Date.now },
    updatedAt: {type: Date,default: Date.now}
}); 

schema.set('toJSON', { virtuals: true });
//export to use this model in entire project/////////////////////////////////
module.exports = mongoose.model('Device', schema);