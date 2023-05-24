import Entrepreneur from "../models/Entrepreneur.js"

// CREATE ENTREPRENEUR
export const createEntrepreneur = async (req, res) => {
  const newEntrepreneur = new Entrepreneur(req.body)
  try {
    await newEntrepreneur.save();
    res.status(201).json(newEntrepreneur)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

// GETTING ENTREPRENEUR
export const getEntrepreneurs = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.find();
    res.status(200).json(entrepreneur)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE ENTREPRENEUR
export const updateEntrepreneur = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      const updatedEntrepreneur = await Entrepreneur.findByIdAndUpdate(
        req.params.id,
        {
          $set:res.body,
        },
        {new: true  }
      )
      res.status(200).json(updatedEntrepreneur)
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only update your own account!")
  }
}
// DELETE ENTREPRENEUR
export const deleteEntrepreneur = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      await Entrepreneur.findByIdAndDelete(req.params.id)
      res.status(200).json("Account deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only delete your own account!")
  }
}
// GET A ENTREPRENEUR
export const getEntrepreneur = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id)
    res.status(200).json(entrepreneur)
  } catch (error) {
    console.log(error)
  }
}
