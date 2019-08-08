const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../utilities/db');
const User = db.User;
const Device = db.Device;
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

///////////////////////////////////////////////////////////////////////////////////////////////
// *******USER SERVICES******* ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// **1. User authentication Service **/////////////////////////////////////////////////////////

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    
    if (user && bcrypt.compareSycanc(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject(); //
        const token = jwt.sign({ sub: user.id }, config.secret);  // Generate a token on valid authentication
        const userid = user.id;
        try {
            const response={ status: "Success", message: "Successfully logged in "  };
            console.log(response)
            return response
        } catch (error) {
            const response={ status: "Failed", message: "Error Please try again!" };
            return response
            
        }
    }
        const response = { status: "Failed", message: "Username or Password is wrong! Please try again" };
        return response
}

/////////////////////////////////////////////////////////////////////////////////////////////
// **2. User Registration Service **/////////////////////////////////////////////////////////
async function create(body) {
    //checks for user/or Admin exist or not//////////////////////////////////////////////////
    const user = await User.findOne({ username: body.username });
    const admin = await UserRole.findOne({ userRole: "Admin" });
    if(user){
        let response={status:"Failed",message:"user is already registered"}
        return response;
    }
    //if user is not exists and if admin already exists then it creates different User Role////
      var userRole =admin? 'User':'Admin';

      let newUserRole={
        username:body.username,
        userRole:userRole
    }
    //create a new user role////////////////////////////////////////////
    const addUserRole = new UserRole(newUserRole);
    let issavedUserRole=await addUserRole.save();
    let newUser={
        username:body.username,
        hash:bcrypt.hashSync(body.password, 10),
        firstName:body.firstName,
        lastName:body.lastName,
        mobile:body.mobile,
        gender:body.gender,
        userRoleId:issavedUserRole._id
    }
    const addUser = new User(newUser);
    let isSavedUser=await addUser.save();    
    if(isSavedUser&&issavedUserRole){
        console.log(isSavedUser,issavedUserRole)
        const response={ status: "Success", message: "User registered successful!" };
        return response
    }else{
        const response={ status: "Failed", message: "Failed to register user!" };
        return response
    }
}

async function getAll() {
    return await User.find().select('-hash');
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