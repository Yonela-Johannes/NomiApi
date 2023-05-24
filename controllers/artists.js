import Artist from "../models/Artist.js"

// CREATE Artist
export const createArtist = async (req, res) => {
  const newArtist = new Artist(req.body)
  try {
    await newArtist.save();
    res.status(201).json(newArtist)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

// GETTING ARTISTS
export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE ARTIST
export const updateArtist = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      const updatedArtist = await Artist.findByIdAndUpdate(
        req.params.id,
        {
          $set:res.body,
        },
        {new: true  }
      )
      res.status(200).json(updatedArtist)
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only update your own account!")
  }
}
// DELETE ARTIST
export const deleteArtist = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      await Artist.findByIdAndDelete(req.params.id)
      res.status(200).json("Account deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only delete your own account!")
  }
}
// GET A ARTIST
export const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)
    res.status(200).json(artist)
  } catch (error) {
    console.log(error)
  }
}
