import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import doctorModel from "../models/doctorModels.js";
import appointmentModel from "../models/appointmentModel.js";
import moment from "moment";

//register callback
const registerController = async (req, res) => {
    try{
        const exisitingUser = await userModel.findById({email: req.body.email})
        if(exisitingUser){
            return res
                .status(200)
                .send({message:"user already exist", success:false});
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        req.body.password = hashPassword;
        const newUser = new userModel(req.body)
        await newUser.save();
        res.status(201).send({message:'success', success:true});

    } catch(error){
        console.log(error)
        res
        .status(500)
        .send({sucess:false, message:`register controller ${error.message}`,});
    }

}

//login callback
const loginController = async(req,res) =>{
try{
    const user = await userModel.findOne({email:req.body.email})
    if(!user){
        return res.status(200).send({message: 'user not found', success:false})
        
    }
    //decrypt the password first , then check for correct password
    const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message: "Invalid email or password",success:false });
        }

        const token = JWT.sign({id:user._id} ,process.env.JWT_SECRET,{expiresIn: '10d'})
        res.status(200).send({message: 'login success', success:true, token});

} catch(error){
    console.log(error)
    res.status(500).send({message: `error in login ctrl ${error.message}`})
}
};

const authController = async(req,res) =>{
    try{
        const user = await userModel.findOne({ _id: req.body.userId});
        user.password = undefined;
        if(!user){
            return res.status(200).send({message: 'user not found', success: false,});
        } else{
            res.status(200).send({success:true, 
            data:user,
        });
        }
    } catch(error){
        console.log(error)
        res.status(500).send({message: 'auth error', success: false, error})
    }
};

//to apply doctor ctrl
const applyDoctorController = async(req,res) =>{
    try{
        const newDoctor= await doctorModel({...req.body, status:'pending' })
        await newDoctor.save()
        const adminUser = await userModel.findOne({isAdmin: true})
        const Notification = adminUser.Notification
        Notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath:'/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {Notification})
        res.status(201).send({
            success:true, message:"doctor account accepted succesfully"
        })
        } catch(error){
        console.log(error)
        res.status(500).send({message: 'error while applying for doctor', success: false, error})
    }
};

//notification controller

const getAllNotificationController = async(req,res) =>{
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    const seenNotification = user.seenNotification
    const Notification = user.Notification
    seenNotification.push(...Notification)
    user.Notification = []
    user.seenNotification = Notification
    const updatedUser = await user.save()
    res.status(200).send({
        success:true,
        message: ' notification marked as read',
        data: updatedUser,
    });
  } catch(error){
    console.log(error)
    res.status(500).send({
        message: 'Error in notification',
        success: false,
        error
    })
  }
 };


 //delete notification
 const deleteAllNotificationController = async(req,res) =>{
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        user.Notification = []
        user.seenNotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({
            success:true,
            message:'Notification deleted succesfully',
            data:updatedUser,
        });
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'unable to delete all notifications',
            error
        })
    }
 }

//get all doctors
const getAllDoctorsController = async (req, res) => {
    try {
      const doctors = await doctorModel.find({ status: "approved" });
      res.status(200).send({
        success: true,
        message: "Docots Lists Fetched Successfully",
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Errro WHile Fetching DOcotr",
      });
    }
  };
  
  //BOOK APPOINTMENT
  const bookeAppointmnetController = async (req, res) => {
    try {
      req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      req.body.time = moment(req.body.time, "HH:mm").toISOString();
      req.body.status = "pending";
      const newAppointment = new appointmentModel(req.body);
      await newAppointment.save();
      const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
      user.Notification.push({
        type: "New-appointment-request",
        message: `A new Appointment Request from ${req.body.userInfo.name}`,
        onCLickPath: "/users/appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Book succesfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While Booking Appointment",
        
      });
    }
  };
  
//   // booking bookingAvailabilityController
  const bookingAvailabilityController = async (req, res) => {
    try {
      const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
      const doctorId = req.body.doctorId;
      const appointments = await appointmentModel.find({
        doctorId,
        date,
        time: {
          $gte: fromTime,
          $lte: toTime,
        },
      });
      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not Availibale at this time",
          success: true,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Appointments available",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Booking",
      });
    }
  };

  const userAppointmentController = async(req,res) =>{
 try{
    const appointments = await appointmentModel.find({userId: req.body.userId})
    res.status(200).send({
      success: true,
      message:"success",
      data:appointments
    })
 } catch(error){
  console.log(error)
  res.status(500).send({
    success: false,
    error,
    message: "error in user Appointment"
  })
 }
  }


export { loginController, registerController,deleteAllNotificationController, authController,applyDoctorController, getAllNotificationController,getAllDoctorsController,bookeAppointmnetController
    ,bookingAvailabilityController,userAppointmentController};