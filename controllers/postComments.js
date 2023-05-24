import Post from "../models/Post.js"
import PostComment from "../models/PostComment.js"

export const getPostComments = async (req, res) => {
  const { postId } = req.params
  try {
    const comments = await Post.find(postId)
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
  }
}

export const addPostComment = async (req, res) => {
  const newComment = new PostComment({...req.body, userId: req.user.id})
  try {
    const saveComment = await newComment.save();
    res.status(200).send(saveComment)
  } catch (error) {
    console.log(error)
  }
}

export const deletePostComment = async (req, res) => {

}
