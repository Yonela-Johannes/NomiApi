import mongoose from "mongoose";
import Post from "../models/Post.js"

export const getPosts = async (req, res) => {
  try {
      const postMessages = await Post.find();
      res.status(200).json(postMessages)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
      const postMessages = await Post.findById(id);
      res.status(200).json(postMessages)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  console.log("I created a post:: ::", post)
  const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()})
  try {
    await newPost.save();
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  const updatePost = await Post.findByIdAndUpdate(_id, {...post, _id}, {new: true});

  res.json(updatePost)
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  await  Post.findByIdAndRemove(_id);
  res.json({message: 'Post deleted successfully'});
}

export const supportPost = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const song = await Post.findById(_id);
  const updatedPost = await Post.findByIdAndUpdate(_id, {supportCount: blog.supportCount + 1}, { new: true});

  res.json(updatedPost)
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const post = await Post.findById(_id);
  const updatedPost = await Post.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, { new: true});

  res.json(updatedPost)
}

export const lovePost = async (req, res) => {
  const { id: _id } = req.params;

  if(!req.userId) return res.json({message: 'Unauthenticated'});
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const post = await Post.findById(_id);
  const index = post.lovePost.findIndex((id) => id === String(req.userId));
  if(index == -1){
    post.loveCount.push(req.userId)
  }

  const updatedPost = await Post.findByIdAndUpdate(
    _id, {loveCount: post.loveCount + 1,
      post
  }, { new: true});

  res.json(updatedPost)
}

export const viewPost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const post = await Post.findById(_id);
  const updatedPost = await Post.findByIdAndUpdate(_id, {viewCount: post.viewCount + 1}, { new: true});

  res.json(updatedPost)
}

export const sharePost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const post = await Post.findById(_id);
  const updatedPost = await Post.findByIdAndUpdate(_id, {shareCount: post.shareCount + 1}, { new: true});

  res.json(updatedPost)
}
