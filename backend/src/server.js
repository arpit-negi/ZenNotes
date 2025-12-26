import express from "express"
import dotenv from "dotenv"
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT||5001;
const __dirname = path.resolve();

if( process.env.NODE_ENV !== "production"){
app.use(cors({
    origin: "http://localhost:5173",
}))

}
if (process.env.NODE_ENV === "production") {

  // ✅ FORCE OVERRIDE CSP (THIS FIXES THE ERROR)
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self' data:",
        "img-src 'self' data:",
        "connect-src 'self'"
      ].join("; ")
    );
    next();
  });

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}



app.use(express.json())
app.use(rateLimiter)


app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res) =>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}

connectDB().then(() =>{
    app.listen(PORT,() =>{
    console.log("server on PORT",PORT)
})
});






