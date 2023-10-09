
const  mongoose  = require("mongoose");
const Blogs = require("../model/Blog");
const User = require('../model/userModel');

exports.getAllBlogs = async(req,res)=>{
    try{
        let blogs = await Blogs.find();

        if(!blogs){
            return res.status(404).json({
                success:false,
                message:"No Blogs Available"
            })
        }

        else{
            return res.status(200).json({
                success:true,
                message:"All blogs available",
                data:blogs
            })
        }

    }
    catch(err){
        console.error("During fetch all Blogs",err);
        return res.status(500).json({
            success:false,
            message:"Could not fetch all Blogs"
        })
    }
}


exports.blogAdd = async(req,res)=>{
    try{
        
        const {title,description,image,user} = req.body;

        // if(!title || !description || !image || !user){
        //     return res.status(400).send({
        //         success:false,
        //         message:"All fields required"
        //     })
        // }

        const existUser = await User.findById(user);

        if(!existUser){
            return  res.status(401).send({
                success:false,
                message:"Unable to find By This ID"
            })
        }

        const blog = new Blogs({
            title,
            description,
            image,
            user
        });
        try{
            const session = await mongoose.startSession();
           session.startTransaction();
           await blog.save({session});
           existUser.blogs.push(blog);
           await existUser.save({session})
           await session.commitTransaction();

        }
        catch(err){
            console.log("something error",err)
            return res.status(500).json({
                success:false,
                message:err
            })

        }
        
        // create a blog
        


        if(blog){
            console.log("added Blogs");
            return res.status(200).json({
                success:true,
                message:"User Blogs creates successfully",
                data:blog
            })
        }


    }
    catch(err){
        console.log("Not added Blogs",err)
        return res.status(500).json({
            success:false,
            message:"couldn't add Blogs"
        })
    }
}

exports.updateBlogs = async (req,res)=>{
    try{
        const {title,description,image,user} = req.body;
        const blogId = req.params.id;
        // validation
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:"All fields required"
            })
        }

        const blog = await Blogs.findByIdAndUpdate(blogId,{
            title,
            description,
            image,
            user

        })

        if(blog)
        console.log("My blogs Updated")
            return res.status(200).json({
                success:true,
                message:"User Blogs updated successfully",
                data:blog
            })
        }

    
    catch(err){
        console.log("Not update Blogs",err)
        return res.status(500).json({
            success:false,
            message:"couldn't update Blogs"
        })
    }
}

exports.getById = async (req,res)=>{
    try{
        const id = req.params.id;
        const fetchblogId  = await Blogs.findById(id);
        if(fetchblogId){
            console.log("My blogs ")
            return res.status(200).json({
                success:true,
                message:"User Blogs  fetched successfully",
                data:fetchblogId
            })

        }

    }
    catch(err){
        console.log("not fetched",err)
        return res.status(500).json({
            success:false,
            message:"couldn't Fetched  Id Blogs"
        })
    }
}


exports.deleteBlog = async(req,res)=>{
    try{
            const id = req.params.id;
            const blog = await Blogs.findByIdAndRemove(id);
            // ;
            
             

            if(blog){
                return res.status(200).json({
                    success:true,
                    message:"Blogs Deleted"
                })
            }
    }
    catch(err){
        console.log("Not Deleted Blog",err)
        return res.status(500).json({
            success:false,
            message:"couldn't Delete Id Blogs"
        })
    }
}