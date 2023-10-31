import express from "express";
const doctorrouter = express.Router()
import middlewareF from "../middleware/authMiddleware.js";
import {getDoctorByIdController, updateProfileController,getDoctorInfoController,doctorAppointmentsController,updateStatusController} from "../controllers/doctorCtrl.js"

//Get single
doctorrouter.post("/getDoctorInfo", middlewareF, getDoctorInfoController);

//POST UPDATE PROFILE
doctorrouter.post("/updateProfile", middlewareF, updateProfileController);

//POST  GET SINGLE DOC INFO
doctorrouter.post("/getDoctorById", middlewareF, getDoctorByIdController);


//get Appointments
doctorrouter.get('/doctor-appointments',middlewareF, doctorAppointmentsController )

//Post Update
doctorrouter.post('/updateStatus', middlewareF, updateStatusController)
export default doctorrouter;
