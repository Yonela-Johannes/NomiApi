import Writer from "../models/Writer.js"

// CREATE WRITER
export const createWriter = async (req, res) => {
  const newWriter = new Writer(req.body)
  try {
    await newWriter.save();
    res.status(201).json(newWriter)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

// GETTING WRITERS
export const getWriters = async (req, res) => {
  try {
    const writers = await Writer.find();
    res.status(200).json(writers)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE WRITER
export const updateWriter = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      const updatedWriter = await Writer.findByIdAndUpdate(
        req.params.id,
        {
          $set:res.body,
        },
        {new: true  }
      )
      res.status(200).json(updatedWriter)
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only update your own account!")
  }
}
// DELETE WRITER
export const deleteWriter = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      await Writer.findByIdAndDelete(req.params.id)
      res.status(200).json("Account deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only delete your own account!")
  }
}
// GET A WRITER
export const getWriter = async (req, res) => {
  try {
    const writer = await Writer.findById(req.params.id)
    res.status(200).json(writer)
  } catch (error) {
    console.log(error)
  }
}
