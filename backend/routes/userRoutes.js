import express from "express";
import {loginController, registerController, deleteAllNotificationController, authController,applyDoctorController,getAllNotificationController, getAllDoctorsController,bookeAppointmnetController,bookingAvailabilityController,userAppointmentController} from "../controllers/userCtrl.js";
import middlewareF from "../middleware/authMiddleware.js";
//router object
const userrouter = express.Router()

//routes

//login
userrouter.post('/login',loginController);

//register
userrouter.post('/register', registerController);

//auth , post
userrouter.post('/getUserData' ,middlewareF , authController);

//apply doctor
userrouter.post('/apply-doctor' , middlewareF, applyDoctorController);


//apply notification||post
userrouter.post('/get-all-notification' , middlewareF, getAllNotificationController);

userrouter.post('/delete-all-notification' , middlewareF, deleteAllNotificationController);


//get All doc
userrouter.get('/getAllDoctors' , middlewareF, getAllDoctorsController);

//booking router
userrouter.post('/bookeAppointmnet' , middlewareF, bookeAppointmnetController);


//book availability router
userrouter.post('/bookingAvailability' , middlewareF, bookingAvailabilityController);

//appointment list
userrouter.get('/user-appointments' , middlewareF, userAppointmentController);

export default userrouter;