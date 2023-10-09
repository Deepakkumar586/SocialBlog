const express = require('express');
const { getAllBlogs, blogAdd, updateBlogs, getById } = require('../controllers/blogController');
const blogRouter = express.Router();

blogRouter.post("/addBlogs",blogAdd)
blogRouter.get("/allblogs",getAllBlogs)
blogRouter.put("/update/:id",updateBlogs)
blogRouter.get("/:id",getById)



module.exports = blogRouter;