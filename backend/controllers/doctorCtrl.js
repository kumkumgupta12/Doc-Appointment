import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModels.js"
import userModel from "../models/userModels.js";
const getDoctorInfoController = async(req,res)=>{
    try {
        //userId ke basis pr find doctor
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({
          success: true,
          message: "doctor data fetch success",
          data: doctor,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Fetching Doctor Details",
        });
      }
}

const updateProfileController = async(req,res)=>{
    try {
        const doctor = await doctorModel.findOneAndUpdate(
          { userId: req.body.userId },
          req.body
        );
        res.status(201).send({
          success: true,
          message: "Doctor Profile Updated",
          data: doctor,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Doctor Profile Update issue",
          error,
        });
      }
}

//get one doctor
const getDoctorByIdController= async(req,res)=>{
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({
          success: true,
          message: "Sigle Doc Info Fetched",
          data: doctor,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Single docot info",
        });
      }
}

const doctorAppointmentsController = async(req,res) =>{
  try{
    const doctor = await doctorModel.findOne({userId: req.body.userId})
    const appointments = await appointmentModel.find({doctorId:doctor._id})
      res.status(200).send({
           success:true,
           message:"doctor appointmensts fetched succesfully",
           data: appointments,
      });
  } catch(error){
   console.log(error)
   res.status(500).send({
    success: false,
    error,
   message: "Appointments are not fetched"
   })
  }
}
const updateStatusController = async(req,res) =>{
  try{
   const {appointmentsId, status} = req.body
   const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
   const user = await userModel.findOne({ _id: appointments.userId });
     
   user.Notification.push({
        type: "status update",
        message: `Your appointment request has been ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment status updated",
      })
  } catch(error){
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in update status'
    })

  }
}
export {getDoctorInfoController,updateProfileController,getDoctorByIdController, doctorAppointmentsController,updateStatusController};