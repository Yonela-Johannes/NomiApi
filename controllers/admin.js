import Admin from "../models/Admin.js"

// CREATE ADMIN
export const createAdmin = async (req, res) => {
  const newAdmin = new Admin(req.body);
  try {
    await newAdmin.save();
    res.status(201).json(newAdmin)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

// GET A ADMIN
export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
    console.log("This are the admins", admin)
    res.status(200).json(admin)
  } catch (error) {
    console.log(error)
  }
}
// GETTING ADMIN'S
export const getAdmins = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json(admin)
  } catch (error) {
    console.log(error)
  }
}
// UPDATE ADMIN
export const updateAdmin = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        {
          $set:res.body,
        },
        {new: true  }
      )
      res.status(200).json(updatedAdmin)
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only update your own account!")
  }
}
// DELETE ADMIN
export const deleteAdmin = async (req, res) => {
  if(req.params.id == req.user.id){
    try {
      await Admin.findByIdAndDelete(req.params.id)
      res.status(200).json("Account deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }else{
    return res.status(403).json("You can only delete your own account!")
  }
}
