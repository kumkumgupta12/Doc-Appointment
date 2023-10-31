//cretating schema using mongoose
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is require']
    },
    email:{
        type:String,
        required:[true,'email is require']
    },
    password:{
        type:String,
        required:[true,'password is require']
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    isDoctor:{
        type: Boolean,
        default:false
    },
    Notification:{
        type: Array,
        default: []
    },
    seenNotification:{
        type: Array,
        default: []
    },

});

const userModel = mongoose.model('users', userSchema);

export  default userModel;