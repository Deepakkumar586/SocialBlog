const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            // minLength:6
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            // minLength:6
        }
    }
);

// why use
module.exports = mongoose.model("User",userSchema)

// export default mongoose.model("User",userSchema)