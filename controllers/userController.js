const User = require('../model/userModel')
const bcrypt = require("bcrypt");

exports.getAlluser = async(req,res)=>{
    try{
        let users = await User.find();
        if(users){
            return res.status(200).json({
                success:true,
                message:"Fetch all user Data"
            })
        }

    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"User Data fetch Problem"
        })
    }
}

exports.signup = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        //  // check all details 
         if(!name || !email || !password){
            return res.status(403).send({
                success:false,
                message:"All fields required"
            })
        }
        
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(404).json({
                success:false,
                message:"user already exist"
            })
        }

           

        // become password hashpassword
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        })

        if(newUser){
            console.log("Created");
            return res.status(200).json({
                success:true,
                message:"User Create success",
                data:newUser
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User not created"
        })
    }
}

exports.login = async(req,res)=>{
    try{
        const{email,password} = req.body;

        // check validation
        if(!email || !password){
            return res.status(403).send({
                success:false,
                message:"All fields required"
            })
        }

        // find user for email
        // Return 401 Unauthorized status code with error message
        const user  = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }

        // compare the password
        const isPassswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPassswordCorrect){
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }

        else{
            console.log("user logged in Successfully")
            return res.status(200).json({
				success: true,
				message: `Log in successfull`,
			});
        }

    




    }
    catch(err){
        console.log("Login Error")
        return res.status(500).json({
            success:false,
            message:"User Login Problem"
        })
    }
}