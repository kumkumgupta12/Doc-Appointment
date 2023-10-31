import doctorModel from "../models/doctorModels.js"
import userModel from "../models/userModels.js"

const getAllUsersController = async(req,res) =>{
    try{
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message:'user data',
            data: users,
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while fetching user",
            error
        });
    }
};

const getAllDoctorsController = async(req,res) => {
    try{
        const doctor = await doctorModel.find({})
        res.status(200).send({
            success: true,
            message:"doctor data",
            data: doctor,
        })
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false ,
            message: "error while fetching users",
            error,
        });
    }
}

const changeAccountStatusController = async(req,res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
      const user = await userModel.findOne({ _id:doctor.userId });
      const notification = user.Notification;
      notification.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      
      user.isDoctor = status === "approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
  };

export {getAllDoctorsController, getAllUsersController,changeAccountStatusController} ;