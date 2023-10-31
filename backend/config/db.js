import { MongoClient, ServerApiVersion } from "mongodb";
import colors from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
const connectDB = async() => {
    // try {
    //   // Connect the client to the server	(optional starting in v4.7)
    //   await client.connect();
    //   // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
    //   console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // } catch(error){
    //     console.log(`mongoDB server issue ${error}` .bgRed.white);
    // }finally {
    //     // Ensures that the client will close when you finish/error
    //     await client.close();
    // }
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log(`Mongodb connected ${mongoose.connection.host}` .bgGreen.white);
    } catch(error){
      console.log(`Mongodb server issue ${error}` .bgRed.white)
    }
    
}
export default connectDB;