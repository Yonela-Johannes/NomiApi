import Music from "../models/Music.js";
import User from "../models/User.js";

// -----CRUD
// GET MUSIC
export const getSong = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    res.status(200).json(music)
  } catch (error) {
    console.log(error)
  }
}

// GET MUSIC
export const getSongs = async (req, res) => {
  try {
    const songs = await Music.find();
    res.status(200).json(songs)
  } catch (error) {
    console.log(error)
  }
}
// ADD MUSIC
export const addSong = async (req, res) => {
  console.log("This is the user:: ::" , req.body)
  const newSong = new Music({ userId: req.userId, ...req.body });
  try {
    const saveSong = await newSong.save();
    res.status(200).json(saveSong)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE MUSIC
export const updateSong = async (req, res) => {
  try {
    const song = new Music.findById(req.params.id);
    if(!song) return res.status(404).json("Music not found!");
    if(req.user.id === song.userId){
      const updatedSong = await Music.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedSong)
    }else{
      return res.status(403).json("You can only update your song!")
    }
  } catch (error) {
    console.log(error)
  }
}
// DELETE MUSIC
export const deleteSong = async (req, res) => {
  try {
    const song = new Music.findById(req.params.id);
    if(!song) return res.status(404).json("Music not found!");
    if(req.user.id === song.userId){
      await Music.findByIdAndDelete(req.params.id);
      res.status(200).json("The song has been deleted")
    }else{
      return res.status(403).json("You can only delete your song!")
    }
  } catch (error) {
    console.log(error)
  }
}
// ----END CRUD

export const supportSong = async (req, res) => {
  const { id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id')

  const song = await Music.findById(id);
  const updatedSong = await Music.findByIdAndUpdate(id, {supportCount: song.supportCount + 1}, { new: true});

  res.json(updatedSong)
}

export const likeSong = async (req, res) => {
  const { id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id')

  const song = await Music.findById(id);
  const updatedSong = await Music.findByIdAndUpdate(id, {likeCount: song.likeCount + 1}, { new: true});

  res.json(updatedSong)
}

export const loveSong = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) return res.json({message: 'Unauthenticated'});
  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id')

  const song = await Music.findById(id);
  const index = song.lovePost.findIndex((id) => id === String(req.userId));
  if(index == -1){
    song.loveCount.push(req.userId)
  }

  const updatedSong = await Music.findByIdAndUpdate(
    id, {loveCount: song.loveCount + 1,
      song
  }, { new: true});

  res.json(updatedSong)
}

export const viewSong = async (req, res) => {
  const { id } = req.params;
  console.log("We are in viewsSong, ", id)
  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id')
  const song = await Music.findById(id);
  const updatedSong = await Music.findByIdAndUpdate(id, {viewsCount: song.viewsCount + 1}, { new: true});

  res.json(updatedSong)
}
export const playCountSong = async (req, res) => {
  const { id } = req.params;
  // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id')

  const song = await Music.findById(id);
  const updatedSong = await Music.findByIdAndUpdate(id, {playCount: song.playCount + 1}, { new: true});

  res.json(updatedSong)
}

export const shareSong = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id')

  const song = await Music.findById(id);
  const updatedSong = await Music.findByIdAndUpdate(id, {shareCount: song.shareCount + 1}, { new: true});

  res.json(updatedSong)
}

// Categories
// SUPPORT
export const getReels = async (req, res) => {
  try {
    const song = await Music.findById(req.params.id);
    res.status(200).json(song)
  } catch (error) {
    console.log(error)
  }
}
// RANDOM
export const random = async (req, res) => {
  try {
    const music = await Music.aggregate([{sample: {size:40}}]);
    res.status(200).json(music)
  } catch (error) {
    console.log(error)
  }
}
// ADD VIEW
export const addView = async (req, res) => {
  try {
    await Music.findById(req.params.id,
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
    const music = await Music.find().sort({viewsCount:-1});
    res.status(200).json(music)
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
        return Music.find({ userId: channelId})
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
    const music = await Music.find({title: { $reqex: query, $options: "i"}}).limit(40);
    res.status(200).json(music)
  } catch (error) {
    console.log(error)
  }
}

// TAG
export const getByTag = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const music = await Music.find({tags: { $in: tags}}).limit(20);
    res.status(200).json(music)
  } catch (error) {
    console.log(error)
  }
}
