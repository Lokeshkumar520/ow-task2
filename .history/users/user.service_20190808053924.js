const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../utilities/db');
const User = db.User;
const Device = db.Device;

///////////////////////////////////////////////////////////////////////////////////////////////
// *******USER SERVICES******* ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    authenticate,
    create,
    addDevice,
    setDevicePowerOnOff,
    setDeviceRestart,
    deleteDevice,
    deleteAllDevices,
    getAllDevices,
    _cleanDump
};

// **1. User authentication Service **/////////////////////////////////////////////////////////

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSycanc(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        // Generate a user token on valid authentication///////////
        const token = jwt.sign({ sub: user.id }, config.secret);
       let response ={
        status: "Success",
        message: "Successfully logged in ",
        token: token,
        profile: userWithoutHash
    };
        return response;

    }
    let response ={
        status: "Authentication failed",
        message: "Wrong username/password! Please Enter Correct username and password."
    };
    return response; 
}

/////////////////////////////////////////////////////////////////////////////////////////////
// **2. User Registration Service **/////////////////////////////////////////////////////////

async function create(body) {
    //checks for Admin exist or not//////////////////////////////////////////////////
    const isAdmin = await User.findOne({ userRole: 'Admin' });
    if (isAdmin) {
        let response = { status: "Failed", message: "Admin is already registered as " + isAdmin.username };
        return response;
    }
    //if Admin is not exists then it allows to create an admin////////////////////////
    let newAdmin = {
        username: body.username,
        hash: bcrypt.hashSync(body.password, 10),
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        userRole: 'Admin'
    }
    const addAdmin = new User(newAdmin);
    let isSavedAdmin = await addAdmin.save();
    let response= isSavedAdmin ?{ status: 'Success', message: 'Registered Admin' } :
    { status: 'Failed', message: 'Admin Registration failed!' };
    return response;
}

async function addDevice({ newDeviceName, newDeviceActions }) {
    const isDeviceExist = await Device.findOne({ deviceName: newDeviceName });
    if (isDeviceExist) {
        let response = { status: 'Failed!', message: 'Device name already exist, Please try with different Name.' }; 
        return response;
    }
    let newDevice = {
        deviceName: newDeviceName,
        deviceAction: { restart: newDeviceActions.restart, powerOnOff: newDeviceActions.powerOnOff }
    }
    const addNewDevice = new Device(newDevice);
    try {
        await addNewDevice.save();
        io.emit('new_Device_Added', await Device.find({}));
        let response = { status: 'Success', message: 'New Device Added Successfully' };
        return response;
    } catch (error) {
        let response =  { status: 'Failed', message: 'Failed to add new device Please try again!' };
        return response;
    }

}

async function setDevicePowerOnOff(body) {
    const isDevice = await Device.findById({ _id: body.id });
    if (isDevice) {
        const newAction = { deviceAction: { restart: isDevice.deviceAction.restart, powerOnOff: body.powerOnOff } };
        Object.assign(isDevice, newAction);
        try {
            await isDevice.save();
            io.emit('device_Action_Changed', await Device.find({}));
            let response = { status: 'Success', message: 'Device Action Changed Successfully' };
            return response;
        } catch (error) {
            console.error(error);
            let response = { status: 'Failed', message: 'Error in Device Action, please try again' };
            return response;
        }
    }
    let response = { status: 'Failed', message: 'Device is not exist' };
    return response;
}

async function setDeviceRestart(body) {
    const isDevice = await Device.findById({ _id: body.id });
    if (isDevice) {
        const newAction = { deviceAction: { restart: body.restart, powerOnOff: isDevice.deviceAction.powerOnOff } };
        Object.assign(isDevice, newAction);
        try {
            await isDevice.save();
            io.emit('device_Action_Changed', await Device.find({}));
            let response = { status: 'Success', message: 'Device Action Changed Successfully' };
            return response;
        } catch (error) {
            let response = { status: 'Failed', message: 'Error in Device Action, please try again' };
            console.error(error);
            return response;
        }
    }
    let response =  { status: 'Failed', message: 'Device is not exist' };
}
    return response;

async function deleteDevice(body) {
    const isDevice = await Device.findByIdAndDelete({ _id: body.id });
    if (isDevice) {
        io.emit('device_deleted', { message: isDevice.deviceName + ' is deleted', freshDeviceList: await Device.find({}) });
        return { status: 'Success', message: isDevice.deviceName + ' Device deleted Successfully' };
    }
    return { status: 'Failed', message: 'Device is not exist/already removed' };
}

async function deleteAllDevices() {
    const isDevice = await Device.find({}).deleteMany();
    if (isDevice) {
        io.emit('All_devices_deleted', { message: isDevice + ' are deleted', freshDeviceList: await Device.find({}) });
        return { status: 'Success', message: 'All Device are deleted Successfully' };
    }
    return { status: 'Failed', message: 'Devices not exist/already removed' };

}

async function getAllDevices() {
    const isDevice = await Device.find({});
    if (isDevice) {
        
        return { status: 'Success', message: 'All Device are deleted Successfully', deviceList:isDevice };
    }
    return { status: 'Failed', message: 'Devices are not exist' };
}

// cleans the database/////////////////////////////////////////////////////////
async function _cleanDump() {
    try {
        await User.find({}).deleteMany();
        await Device.find({}).deleteMany();
        console.log("Cleaned Database, and Test the task using Registration APIs/cURLS");
    } catch (error) {
        console.log(error);
    }
}