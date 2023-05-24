import PostMessage from "../models/Post.js"
import PostMessageComment from "../models/PostComment.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

// GETTING USERS
export const getOwner = async (req, res) => {
  try {
    const owner = await User.find({isOwner: true})
    res.status(200).json(owner)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE USER
export const updateOwner = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set:res.body,
        },
        {new: true  }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only update your own account!")
  }
}
