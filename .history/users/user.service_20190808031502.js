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

        return {
            status: "Success",
            message: "Successfully logged in ",
            token: token,
            profile: userWithoutHash
        };

    }
    return {
        status: "Authentication failed",
        message: "Wrong username/password! Please Enter Correct username and password."
    };
}

/////////////////////////////////////////////////////////////////////////////////////////////
// **2. User Registration Service **/////////////////////////////////////////////////////////

async function create(body) {
    //checks for Admin exist or not//////////////////////////////////////////////////
    const isAdmin = await User.findOne({ userRole: 'Admin' });
    if (isAdmin) {

        return { status: "Failed", message: "Admin is already registered as " + isAdmin.username };
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
    return isSavedAdmin ? { status: 'Success', message: 'Registered Admin' } :
        { status: 'Failed', message: 'Admin Registration failed!' };
}

async function addDevice({ newDeviceName, newDeviceActions }) {
    const isDeviceExist = await Device.findOne({ deviceName: newDeviceName });
    if (isDeviceExist) {
        return { status: 'Failed!', message: 'Device name already exist, Please try with different Name.' };
    }
    let newDevice = {
        deviceName: newDeviceName,
        deviceAction: { restart: newDeviceActions.restart, powerOnOff: newDeviceActions.powerOnOff }
    }
    const addNewDevice = new Device(newDevice);
    try {
        await addNewDevice.save();
        io.emit('new_Device_Added', await Device.find({}));
        return { status: 'Success', message: 'New Device Added Successfully' };
    } catch (error) {
        return { status: 'Failed', message: 'Failed to add new device Please try again!' };

    }



}

async function getById(id) {
    return await User.findById(id).select('-hash');
}
// cleans the database/////////////////////////////////////////////////////////
async function _cleanDump() {
    try {
        await User.find({}).deleteMany();
        await UserRole.find({}).deleteMany();
        console.log("Cleaned Database, and Test the task using Registration APIs/cURLS");
    } catch (error) {
        console.log(error);
    }
}