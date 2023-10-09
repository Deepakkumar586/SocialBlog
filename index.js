const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require('./routes/userRoute')
const bodyParser = require('body-parser');
const blogRouter = require("./routes/blogsRoute");
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://deepakkumar:deepakkumar@cluster0.ouaxj8f.mongodb.net/BlogsApp')
.then(()=>console.log("Database connection Successfully"))
.catch((err)=>console.log("Databse connection error",err));


app.use("/api/user",router)
app.use("/api/blog",blogRouter)


app.use(express.json());


app.listen(5000, () => {
    console.log("App is running successfull")
})


// app.get("/", (req, res) => {
//     res.send(`<h1>this is My First Website Page</h1>`)
// }
// )


