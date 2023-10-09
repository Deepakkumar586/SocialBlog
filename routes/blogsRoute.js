const express = require('express');
const { getAllBlogs, blogAdd, updateBlogs, getById, deleteBlog } = require('../controllers/blogController');
const blogRouter = express.Router();

blogRouter.post("/addBlogs",blogAdd)
blogRouter.get("/allBlogs",getAllBlogs)
blogRouter.put("/update/:id",updateBlogs)
blogRouter.get("/:id",getById)
blogRouter.delete("/:id",deleteBlog)



module.exports = blogRouter;