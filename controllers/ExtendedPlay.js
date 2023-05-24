import MusicEP from "../models/MusicEP.js";
import User from "../models/User.js";

// -----CRUD
// GET EP
export const getEP = async (req, res) => {
  try {
    const ep = await MusicEP.findById(req.params.id);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}

// GET EP
export const getEPs = async (req, res) => {
  try {
    const eps = await MusicEP.find();
    res.status(200).json(eps)
  } catch (error) {
    console.log(error)
  }
}
// ADD EP
export const addEP = async (req, res) => {
  const newEP = new MusicEP({ userId: req.user.id, ...req.body });
  try {
    const saveEP = await newEP.save();
    res.status(200).json(saveEP)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE EP
export const updateEP = async (req, res) => {
  try {
    const ep = new MusicEP.findById(req.params.id);
    if(!ep) return res.status(404).json("MusicEP not found!");
    if(req.user.id === ep.userId){
      const updatedEp = await MusicEP.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedEp)
    }else{
      return res.status(403).json("You can only update your ep!")
    }
  } catch (error) {
    console.log(error)
  }
}
// DELETE EP
export const deleteSong = async (req, res) => {
  try {
    const ep = new MusicEP.findById(req.params.id);
    if(!ep) return res.status(404).json("MusicEP not found!");
    if(req.user.id === ep.userId){
      await MusicEP.findByIdAndDelete(req.params.id);
      res.status(200).json("The ep has been deleted")
    }else{
      return res.status(403).json("You can only delete your ep!")
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
    const ep = await MusicEP.findById(req.params.id);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}
// RANDOM
export const random = async (req, res) => {
  try {
    const ep = await MusicEP.aggregate([{sample: {size:40}}]);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}
// ADD VIEW
export const addView = async (req, res) => {
  try {
    await MusicEP.findById(req.params.id,
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
    const ep = await MusicEP.findById(req.params.id);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}

// BLOG
export const getBlog = async (req, res) => {
  try {
    const ep = await MusicEP.findById(req.params.id);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}

// STORY
export const getStory = async (req, res) => {
  try {
    const ep = await MusicEP.findById(req.params.id);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}
// MUSIC
export const getMusic = async (req, res) => {
  try {
    const ep = await MusicEP.findById(req.params.id);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}

// TREND
export const trend = async (req, res) => {
  try {
    const ep = await MusicEP.find().sort({viewsCount:-1});
    res.status(200).json(ep)
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
        return MusicEP.find({ userId: channelId})
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
    const ep = await MusicEP.find({title: { $reqex: query, $options: "i"}}).limit(40);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}

// TAG
export const getByTag = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const ep = await MusicEP.find({tags: { $in: tags}}).limit(20);
    res.status(200).json(ep)
  } catch (error) {
    console.log(error)
  }
}
