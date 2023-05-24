import mongoose from "mongoose";
import Dev from "../models/Dev.js"

export const getDevs = async (req, res) => {
  try {
      const dev = await Dev.find();
      res.status(200).json(dev)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const getDev = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const dev = await Dev.findById(_id);
      res.status(200).json(dev)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const createDev = async (req, res) => {
  const dev = req.body;
  const newDev = new Dev({...dev, creator: req.userId, createdAt: new Date().toISOString()})
  try {
    await newDev.save();
    res.status(201).json(newDev)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const updateDev = async (req, res) => {
  const { id: _id } = req.params;
  const dev = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No dev with that id')
  const updateDev = await Dev.findByIdAndUpdate(_id, {...dev, _id}, {new: true});

  res.json(updateDev)
}

export const deleteDev = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No dev with that id')

  await  Dev.findByIdAndRemove(_id);
  res.json({message: 'Dev deleted successfully'});
}

export const likeDev = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No dev with that id')

  const dev = await Dev.findById(_id);
  const updatedDev = await Dev.findByIdAndUpdate(_id, {likeCount: dev.likeCount + 1}, { new: true});

  res.json(updatedDev)
}

export const supportDev = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No dev with that id')

  const dev = await Dev.findById(_id);
  const updatedDev = await Dev.findByIdAndUpdate(_id, {supportCount: dev.supportCount + 1}, { new: true});

  res.json(updatedDev)
}

export const loveDev = async (req, res) => {
  const { id } = req.params;

  // if(!req.userId){
  //   res.json({message: 'Unauthenticated'});
  // }else {
    // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No dev with that id')

    const dev = await Dev.findById(id);
    // const index = dev.loveDev.findIndex((id) => id === String(req.userId));
    // if(index == -1){
    //   dev.loveCount.push(req.userId)
    // }
    const updatedDev = await Dev.findByIdAndUpdate(id, {loveCount: dev.loveCount + 1, dev }, { new: true});
    res.json(updatedDev)
  // }
}


export const viewDev = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No dev with that id')

  const dev = await Dev.findById(_id);
  const updatedBlog = await Dev.findByIdAndUpdate(_id, {viewCount: dev.viewCount + 1}, { new: true});

  res.json(updatedBlog)
}


export const shareDev = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const dev = await Dev.findById(_id);
  const updatedBlog = await Dev.findByIdAndUpdate(_id, {shareCount: dev.shareCount + 1}, { new: true});

  res.json(updatedBlog)
}
