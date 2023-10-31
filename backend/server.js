import express from "express";
import  colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userrouter from "./routes/userRoutes.js";
import router from "./routes/adminRoutes.js";
import doctorrouter from "./routes/doctorRoutes.js";

dotenv.config()
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

connectDB();
//rest object
const app = express();

//middlewares
//to get rid of issue of parse ,using json parse
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/users', userrouter);
app.use('/api/v1/admin',router);
app.use('/api/v1/doctor',doctorrouter);


//listen server
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`);
});

