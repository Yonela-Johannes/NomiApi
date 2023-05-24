import MusicComment from "../models/MusicComment.js";
import Music from "../models/Music.js";

export const getComments = async (req, res) => {
  const {musicId} = req.params
  try {
    const comments = await MusicComment.find({musicId: musicId});
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async (req, res) => {
  const newComment = new MusicComment({...req.body, userId: req.user.id});
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);

  } catch (error) {
    console.log(error)
  }
}

export const deleteComment = async (req, res) => {
  try {
    const comment = await MusicComment.findById(res.params.id);
    const music = await Music.findById(res.params.id)
    if(req.user.id == comment.userId || req.user.id == music.userId){
      await MusicComment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    }else {
      res.status(403).json("You can delete only your comment!")
    }
  } catch (error) {
    console.log(error)
  }
}
