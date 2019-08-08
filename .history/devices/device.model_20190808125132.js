
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const timeZones = require('mongoose-timezone');
const Schema = mongoose.Schema;
//schema for Device model//////////////////////////////////////////////////////
const schema = new Schema({
    deviceName:{type: String, unique:true, required:true},
    deviceAction:{restart:Boolean, powerOnOff:Boolean}    
}); 
schema.plugin(timestamps);
schema.plugin(timeZones);

schema.set('toJSON', { virtuals: true });
//exporting to use this model in entire project/////////////////////////////////
module.exports = mongoose.model('Device', schema);