import Blog from "../models/Blog.js"
import  BlogComment from "../models/BlogComment.js"

export const getBlogComments = async (req, res) => {
  const { postId } = req.params
  try {
    const comments = await Blog.find(postId)
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
  }
}

export const addBlogComment = async (req, res) => {
  const newComment = new BlogComment({...req.body, userId: req.user.id})
  try {
    const saveComment = await newComment.save();
    res.status(200).send(saveComment)
  } catch (error) {
    console.log(error)
  }
}

export const deleteBlogComment = async (req, res) => {

}
