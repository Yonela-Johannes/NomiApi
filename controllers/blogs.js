import mongoose from "mongoose";
import Blog from "../models/Blog.js"

export const getBlogs = async (req, res) => {
  try {
      const blogs = await Blog.find();
      res.status(200).json(blogs)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const getBlog = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const blog = await Blog.findById(_id);
      res.status(200).json(blog)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const createBlog = async (req, res) => {
  const post = req.body;
  const newBlog = new Blog({...post, creator: req.userId, createdAt: new Date().toISOString()})
  try {
    await newBlog.save();
    res.status(201).json(newBlog)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const updateBlog = async (req, res) => {
  const { id: _id } = req.params;
  const blog = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')
  const updateBlog = await Blog.findByIdAndUpdate(_id, {...blog, _id}, {new: true});

  res.json(updateBlog)
}

export const deleteBlog = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  await  Blog.findByIdAndRemove(_id);
  res.json({message: 'Blog deleted successfully'});
}

export const likeBlog = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const blog = await Blog.findById(_id);
  const updatedPost = await Blog.findByIdAndUpdate(_id, {likeCount: blog.likeCount + 1}, { new: true});

  res.json(updatedPost)
}

export const supportBlog = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const blog = await Blog.findById(_id);
  const updatedBlog = await Blog.findByIdAndUpdate(_id, {supportCount: blog.supportCount + 1}, { new: true});

  res.json(updatedBlog)
}

export const loveBlog = async (req, res) => {
  const { id: _id } = req.params;

  if(!req.userId){
    res.json({message: 'Unauthenticated'});
  }else {
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')
    const blog = await Blog.findById(_id);
    const index = blog.loveBlog.findIndex((id) => id === String(req.userId));
    if(index == -1){
      blog.loveCount.push(req.userId)
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      _id, {loveCount: blog.loveCount + 1,
        blog
    }, { new: true});

    res.json(updatedBlog)
  }
}


export const viewBlog = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const blog = await Blog.findById(_id);
  const updatedBlog = await Blog.findByIdAndUpdate(_id, {viewCount: blog.viewCount + 1}, { new: true});

  res.json(updatedBlog)
}


export const shareBlog = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const blog = await Blog.findById(_id);
  const updatedBlog = await Blog.findByIdAndUpdate(_id, {shareCount: blog.shareCount + 1}, { new: true});

  res.json(updatedBlog)
}
