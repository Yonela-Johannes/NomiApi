import Reel from "../models/Reel.js";
import User from "../models/User.js";

// -----CRUD
// GET MUSIC
export const getReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    res.status(200).json(reel)
  } catch (error) {
    console.log(error)
  }
}

// GET MUSIC
export const getReels = async (req, res) => {
  try {
    const reels = await Reel.find();
    res.status(200).json(reels)
  } catch (error) {
    console.log(error)
  }
}
// ADD MUSIC
export const addReel = async (req, res) => {
  console.log("Backend oooo::::adding reel:: ::", req.body)
  const newReel = new Reel({ userId: req.userId, ...req.body });
  try {
    const saveReel = await newReel.save();
    res.status(200).json(saveReel)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE MUSIC
export const updateReel = async (req, res) => {
  try {
    const reel = new Reel.findById(req.params.id);
    if(!reel) return res.status(404).json("Reel not found!");
    if(req.user.id === reel.userId){
      const updatedReel = await Reel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedReel)
    }else{
      return res.status(403).json("You can only update your reel!")
    }
  } catch (error) {
    console.log(error)
  }
}
// DELETE MUSIC
export const deleteReel = async (req, res) => {
  try {
    const reel = new Reel.findById(req.params.id);
    if(!reel) return res.status(404).json("Reel not found!");
    if(req.user.id === reel.userId){
      await Reel.findByIdAndDelete(req.params.id);
      res.status(200).json("The reel has been deleted")
    }else{
      return res.status(403).json("You can only delete your reel!")
    }
  } catch (error) {
    console.log(error)
  }
}
// ----END CRUD

export const supportReel = async (req, res) => {
  const { id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No reel with that id')

  const reel = await Reel.findById(id);
  const updatedReel = await Reel.findByIdAndUpdate(id, {supportCount: reel.supportCount + 1}, { new: true});

  res.json(updatedReel)
}

export const likeReel = async (req, res) => {
  const { id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No reel with that id')

  const reel = await Reel.findById(id);
  const updatedReel = await Reel.findByIdAndUpdate(id, {likeCount: reel.likeCount + 1}, { new: true});

  res.json(updatedReel)
}

export const loveReel = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) return res.json({message: 'Unauthenticated'});
  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No reel with that id')

  const reel = await Reel.findById(id);
  const index = reel.lovePost.findIndex((id) => id === String(req.userId));
  if(index == -1){
    reel.loveCount.push(req.userId)
  }

  const updatedReel = await Reel.findByIdAndUpdate(
    id, {loveCount: reel.loveCount + 1,
      reel
  }, { new: true});

  res.json(updatedReel)
}

export const viewReel = async (req, res) => {
  const { id } = req.params;
  console.log("We are in viewsSong, ", id)
  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No reel with that id')
  const reel = await Reel.findById(id);
  const updatedReel = await Reel.findByIdAndUpdate(id, {viewsCount: reel.viewsCount + 1}, { new: true});

  res.json(updatedReel)
}
export const playCountReel = async (req, res) => {
  const { id } = req.params;
  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No reel with that id')

  const reel = await Reel.findById(id);
  const updatedReel = await Reel.findByIdAndUpdate(id, {playCount: reel.playCount + 1}, { new: true});

  res.json(updatedReel)
}

export const shareReel = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No reel with that id')

  const reel = await Reel.findById(id);
  const updatedReel = await Reel.findByIdAndUpdate(id, {shareCount: reel.shareCount + 1}, { new: true});

  res.json(updatedReel)
}

// Categories
// RANDOM
export const random = async (req, res) => {
  try {
    const reel = await Reel.aggregate([{sample: {size:40}}]);
    res.status(200).json(reel)
  } catch (error) {
    console.log(error)
  }
}
// ADD VIEW
export const addView = async (req, res) => {
  try {
    await Reel.findById(req.params.id,
      {$inc: {viewsCount: 1}}
    );
    res.status(200).json("The view has been increased")
  } catch (error) {
    console.log(error)
  }
}

// TREND
export const trend = async (req, res) => {
  try {
    const reel = await Reel.find().sort({viewsCount:-1});
    res.status(200).json(reel)
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
        return Reel.find({ userId: channelId})
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
    const reel = await Reel.find({title: { $reqex: query, $options: "i"}}).limit(40);
    res.status(200).json(reel)
  } catch (error) {
    console.log(error)
  }
}

// TAG
export const getByTag = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const reel = await Reel.find({tags: { $in: tags}}).limit(20);
    res.status(200).json(reel)
  } catch (error) {
    console.log(error)
  }
}
