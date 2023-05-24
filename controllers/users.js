import PostMessage from "../models/Post.js"
import PostMessageComment from "../models/PostComment.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

// GETTING USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE USER
export const updateUser = async (req, res) => {
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
// DELETE USER
export const deleteUser = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Account deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only delete your own account!")
  }
}
// GET A USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}

export const viewUser = async (req, res) => {
  const { id } = req.params;

  console.log("This si the id brodii:: ::", id)

  let userId = ''
  if(id === 'undefined'  || id === '' || id === undefined || id === null || id === "646060e3d0dc5f83f1bd9ad0"){
    userId = "646060e3d0dc5f83f1bd9ad0"
  }else {
    userId = id
  }

  // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const user = await User.findById(userId);
  const updatedUser = await User.findByIdAndUpdate(userId, {viewsCount: user.viewsCount + 1}, { new: true});

  res.json(updatedUser)
}

// SUPPORT A USER
export const supportUser = async (req, res) => {
    const { id } = req.params;

    // if(!req.userId) return res.json({message: 'Unauthenticated'});

    // if(!mongoos/e.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id')

    const user = await User.findById(id);
    const updatedUser = await User.findByIdAndUpdate(id, {supportCount: user.supportCount + 1}, { new: true});

    res.status(200).json(updatedUser)
}
// LIKE A USER
export const likeUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id);
  const updatedUser = await User.findByIdAndUpdate(id, {likesCount: user.likesCount + 1}, { new: true});

  res.status(200).json(updatedUser)
}

// RATE A USER
export const rateUser = async (req, res) => {
  const { id } = req.params
  let number = Math.floor(Number(Object.keys(req.body)[0]))

  console.log(number)
  const user = await User.findById(id);
  const updatedUser = await User.findByIdAndUpdate(id,
    {rate: user.rate + 1},
    {ratesCount: number},
    { new: true});
  res.status(200).json(updatedUser)
}

// LOVE A USER
export const loveUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id);
  const updatedUser = await User.findByIdAndUpdate(id, {loveCount: user.loveCount + 1}, { new: true});

  res.status(200).json(updatedUser)
}

// ------------------------VIDEOS
// LIKE A VIDEO
export const likeVideo = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId
  try {
    await Video.findByIdAndUpdate(videoId, {
      $push: {likedUsers: id},
      $inc: { likesCount: 1},
    });
    res.status(200).json("The video has been liked.")
  } catch (error) {
    console.log(error)
  }
}
// LOVE A VIDEO
export const loveVideo = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {lovedUsers: id},
      $inc: { lovesCount: 1},
    });
    res.status(200).json("The video has been loved.")
  } catch (error) {
    console.log(error)
  }
}

// LIKE A COMMENT
export const likeVideoComment = async (req, res) => {
  const id = req.user.id;
  const commentId = req.params.commentId
  try {
    await Comment.findByIdAndUpdate(commentId, {
      $addToSet: {likedUsers: id},
      $inc: {likesCount: 1},
    });
    res.status(200).json("The video comment has been liked.")
  } catch (error) {
    console.log(error)
  }
}
// LOVE A COMMENT
export const loveVideoComment = async (req, res) => {
  const id = req.user.id;
  const commentId = req.params.commentId
  try {
    await Comment.findByIdAndUpdate(commentId, {
      $addToSet: {lovedUsers: id},
      $inc: {loveCount: 1},
    });
    res.status(200).json("The video comment has been loved.")
  } catch (error) {
    console.log(error)
  }
}

// ==========================VIDEOS

// ------------------------POSTS
// LIKE A POST
export const likePost = async (req, res) => {
  const id = req.user.id;
  const postId = req.params.postMessageId
  try {
    await PostMessage.findByIdAndUpdate(postId, {
      $push: {likedUsers: id},
      $inc: { likeCount: 1},
    });
    res.status(200).json("The post has been liked.")
  } catch (error) {
    console.log(error)
  }
}
// LOVE A POST
export const lovePost = async (req, res) => {
  const id = req.user.id;
  const postId = req.params.postMessageId
  try {
    await PostMessage.findByIdAndUpdate(postId, {
      $push: {lovedUsers: id},
      $inc: {loveCount: 1},
    });
    res.status(200).json("The post has been loved.")
  } catch (error) {
    console.log(error)
  }
}

export const likePostComment = async (req, res) => {
  const id = req.user.id;
  const commentId = req.params.postCommentId
  try {
    await PostMessageComment.findByIdAndUpdate(commentId, {
      $addToSet: {likedUsers: id},
      $inc: {likesCount: 1},
    });
    res.status(200).json("The video comment has been liked.")
  } catch (error) {
    console.log(error)
  }
}
// LOVE A POST
export const lovePostComment = async (req, res) => {
  const id = req.user.id;
  const commentId = req.params.postCommentId
  try {
    await PostMessageComment.findByIdAndUpdate(commentId, {
      $addToSet: {likedUsers: id},
      $inc: {loveCount: 1},
    });
    res.status(200).json("The video comment has been liked.")
  } catch (error) {
    console.log(error)
  }
}


// ============================ POSTS
