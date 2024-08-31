const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const { readdirSync } = require("fs");

const app = express();

// // Custom CORS configuration
// const corsOptions = {
//     origin: 'https://your-allowed-origin.com', // Specify the allowed origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
//     credentials: true, // Allow credentials (e.g., cookies)
//     optionsSuccessStatus: 204, // Set the response code for preflight requests to 204
//     exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'], // Specify headers exposed to the client
//   };
  
// Enable CORS with custom configuration
// app.use(cors(corsOptions));

// Custom CORS configuration in array
// let allowed = ["https://localhost:3000", "some other link"];
// function options(req,res){
//     let tmp;
//     let origin=req.header("Origin");
//     if(allowed.indexOf(origin) > -1){
//         tmp={
//             origin: true,
//             optionSuccessStatus: 200,
//         };
//     }else{
//         tmp={
//             origin: false,
//         };
//     }
//     res(null, tmp);
// }

// app.use(cors(options));
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

// const users = [{username: "aaaaaa", email: "a@gmail.com"}];

// app.post("/signup", async (req, res) => {
//     const { username, email } = req.body;
//     console.log(username);

//     // if(users.find((user)=> user.username) === username){
//     //     console.log(username);
//     //     return res.send({ fault: "Username already exists", success: false});
//     // }
//       // Check if username already exists in the users array
//       const userExists = users.some(user => user.username === username);
//       const emailExists = users.some(user => user.email === email);

//       if (userExists) {
//           return res.send({ name: "username", fault: "Sorry, this username is already taken. Please choose another one.", success: false });
//       }else if (emailExists) {
//         return res.send({ name: "email", fault: "Oops! This email address is already registered. Please use a different one.", success: false });
//     }

//     res.send({success: true});
// })

app.listen(PORT,()=>{
    console.log("serve is lestining");
});