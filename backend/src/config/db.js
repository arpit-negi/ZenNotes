import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const connectDB = async ()=> {
    try {
     await mongoose.connect(process.env.MONGO_URI)
     console.log("Mongo db connected sucessfully")
    } catch(error){
        console.log("Error connecting to MongoDB",error);
        process.exit(1); //exit with failure 0 for pass
    }
}