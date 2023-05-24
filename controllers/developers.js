import Developer from "../models/Developer.js"

// CREATE DEVELOPER
export const createDeveloper = async (req, res) => {

  const newDeveloper = new Developer(req.body)
  try {
    await newDeveloper.save();
    res.status(201).json(newDeveloper)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

// GETTING DEVELOPERS
export const getDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find();
    res.status(200).json(developers)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE DEVELOPER
export const updateDeveloper = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      const updatedDeveloper = await Developer.findByIdAndUpdate(
        req.params.id,
        {
          $set:res.body,
        },
        {new: true  }
      )
      res.status(200).json(updatedDeveloper)
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only update your own account!")
  }
}
// DELETE DEVELOPER
export const deleteDeveloper= async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      await Developer.findByIdAndDelete(req.params.id)
      res.status(200).json("Account deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only delete your own account!")
  }
}
// GET A DEVELOPER
export const getDeveloper = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id)
    res.status(200).json(developer)
  } catch (error) {
    console.log(error)
  }
}
