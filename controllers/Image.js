import Image from "../models/Image.js";
import User from "../models/User.js";

// -----CRUD
// GET MUSIC
export const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.status(200).json(image)
  } catch (error) {
    console.log(error)
  }
}

// GET MUSIC
export const getImages = async (req, res) => {
  try {
    const reels = await Image.find();
    res.status(200).json(reels)
  } catch (error) {
    console.log(error)
  }
}
// ADD MUSIC
export const addImage = async (req, res) => {
  const newImage = new Image({ userId: req.userId, ...req.body });
  try {
    const saveReel = await newImage.save();
    res.status(200).json(saveReel)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE MUSIC
export const updateImage = async (req, res) => {
  try {
    const image = new Image.findById(req.params.id);
    if(!image) return res.status(404).json("Image not found!");
    if(req.user.id === image.userId){
      const updateImage = await Image.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateImage)
    }else{
      return res.status(403).json("You can only update your image!")
    }
  } catch (error) {
    console.log(error)
  }
}
// DELETE MUSIC
export const deleteImage = async (req, res) => {
  try {
    const image = new Image.findById(req.params.id);
    if(!image) return res.status(404).json("Image not found!");
    if(req.user.id === image.userId){
      await Image.findByIdAndDelete(req.params.id);
      res.status(200).json("The image has been deleted")
    }else{
      return res.status(403).json("You can only delete your image!")
    }
  } catch (error) {
    console.log(error)
  }
}
// ----END CRUD

export const supportImage = async (req, res) => {
  const { id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id')

  const image = await Image.findById(id);
  const updateImage = await Image.findByIdAndUpdate(id, {supportCount: image.supportCount + 1}, { new: true});

  res.json(updateImage)
}

export const likeImage = async (req, res) => {
  const { id } = req.params;
  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id')

  const image = await Image.findById(id);
  const updateImage = await Image.findByIdAndUpdate(id, {likesCount: image.likesCount + 1}, { new: true});

  res.json(updateImage)
}

export const loveImage = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) return res.json({message: 'Unauthenticated'});
  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id')

  const image = await Image.findById(id);
  const index = image.lovePost.findIndex((id) => id === String(req.userId));
  if(index == -1){
    image.loveCount.push(req.userId)
  }

  const updateImage = await Image.findByIdAndUpdate(
    id, {loveCount: image.loveCount + 1,
      image
  }, { new: true});

  res.json(updateImage)
}

export const viewImage = async (req, res) => {
  const { id } = req.params;
  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id')
  const image = await Image.findById(id);
  const updateImage = await Image.findByIdAndUpdate(id, {viewsCount: image.viewsCount + 1}, { new: true});

  res.json(updateImage)
}

export const shareImage = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id')
  const image = await Image.findById(id);
  const updateImage = await Image.findByIdAndUpdate(id, {shareCount: image.shareCount + 1}, { new: true});

  res.json(updateImage)
}

// RANDOM
export const random = async (req, res) => {
  try {
    const image = await Image.aggregate([{sample: {size:40}}]);
    res.status(200).json(image)
  } catch (error) {
    console.log(error)
  }
}
// ADD VIEW
export const addView = async (req, res) => {
  try {
    await Image.findById(req.params.id,
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
    const image = await Image.find().sort({viewsCount:-1});
    res.status(200).json(image)
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
        return Image.find({ userId: channelId})
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
    const image = await Image.find({title: { $reqex: query, $options: "i"}}).limit(40);
    res.status(200).json(image)
  } catch (error) {
    console.log(error)
  }
}

// TAG
export const getByTag = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const image = await Image.find({tags: { $in: tags}}).limit(20);
    res.status(200).json(image)
  } catch (error) {
    console.log(error)
  }
}
