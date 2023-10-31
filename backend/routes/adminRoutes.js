import express from "express";
const router = express.Router()
import middlewareF from "../middleware/authMiddleware.js";
import {getAllUsersController, getAllDoctorsController,changeAccountStatusController} from "../controllers/adminCtrl.js"
//get method for user
router.get('/getAllUsers', middlewareF, getAllUsersController)


//get for all doc
router.get('/getAllDoctors', middlewareF, getAllDoctorsController)


//POST ACCOUNT STATUS
router.post(
    '/changeAccountStatus',
    middlewareF,
    changeAccountStatusController
  );

export default router;