import express from "express"
import dotenv from "dotenv"
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";



const app = express();
const PORT = process.env.PORT||5001;

app.use(cors({
    origin: "*",
}))

dotenv.config()

app.use(express.json())
app.use(rateLimiter)


app.use("/api/notes",notesRoutes);

connectDB().then(() =>{
    app.listen(PORT,() =>{
    console.log("server on PORT",PORT)
})
});






