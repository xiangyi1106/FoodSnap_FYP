const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const { readdirSync } = require("fs");

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
}));

//routes
//return all the files in routes by array for example [user.js, product.js], make it more dynamic
readdirSync("./routes").map((r)=>app.use("/",require("./routes/" + r)));

//database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
.then(()=>console.log("database connect"))
.catch((err)=>console.log("error connect to mongodb",err));

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("serve is lestining");
});