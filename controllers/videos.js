import User from "../models/User.js";
import Video from "../models/Video.js"

// -----CRUD
// GET VIDEO
export const getVideo= async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video)
  } catch (error) {
    console.log(error)
  }
}

// GET VIDEOS
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos)
  } catch (error) {
    console.log(error)
  }
}
// ADD VIDEO
export const addVideo = async (req, res) => {
  const newVideo = new Video({ userId: req.body.userId, ...req.body });
  try {
    const saveVideo = await newVideo.save();
    res.status(200).json(saveVideo)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE VIDEO
export const updateVideo = async (req, res) => {
  try {
    const video = new Video.findById(req.params.id);
    if(!video) return res.status(404).json("Video not found!");
    if(req.user.id === video.userId){
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo)
    }else{
      return res.status(403).json("You can only update your video!")
    }
  } catch (error) {
    console.log(error)
  }
}
// DELETE VIDEO
export const deleteVideo = async (req, res) => {
  try {
    const video = new Video.findById(req.params.id);
    if(!video) return res.status(404).json("Video not found!");
    if(req.user.id === video.userId){
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted")
    }else{
      return res.status(403).json("You can only delete your video!")
    }
  } catch (error) {
    console.log(error)
  }
}
// ----END CRUD

// Categories
// SUPPORT
export const getReels = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video)
  } catch (error) {
    console.log(error)
  }
}
// RANDOM
export const random = async (req, res) => {
  try {
    const videos = await Video.aggregate([{sample: {size:40}}]);
    res.status(200).json(videos)
  } catch (error) {
    console.log(error)
  }
}
// ADD VIEW
export const addView = async (req, res) => {
  try {
    await Video.findById(req.params.id,
      {$inc: {viewsCount: 1}}
    );
    res.status(200).json("The view has been increased")
  } catch (error) {
    console.log(error)
  }
}

// REEL
export const getReel = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video)
  } catch (error) {
    console.log(error)
  }
}

// BLOG
export const getBlog = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video)
  } catch (error) {
    console.log(error)
  }
}

// STORY
export const getStory = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video)
  } catch (error) {
    console.log(error)
  }
}
// MUSIC
export const getMusic = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video)
  } catch (error) {
    console.log(error)
  }
}

// TREND
export const trend = async (req, res) => {
  try {
    const videos = await Video.find().sort({viewsCount:-1});
    res.status(200).json(videos)
  } catch (error) {
    console.log(error)
  }
}

// supporters
export const supporters = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const supportedChannels = user.subscribedSupporters;

    const list = await Promise.all(
      supportedChannels.map((channelId) => {
        return Video.find({ userId: channelId})
      })
    )
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.log(error)
  }
}

// TITLE
export const search = async (req, res) => {
  const query = req.query.q
  try {
    const videos = await Video.find({title: { $reqex: query, $options: "i"}}).limit(40);
    res.status(200).json(videos)
  } catch (error) {
    console.log(error)
  }
}

// TAG
export const getByTag = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({tags: { $in: tags}}).limit(20);
    res.status(200).json(videos)
  } catch (error) {
    console.log(error)
  }
}
