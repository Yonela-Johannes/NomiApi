import mongoose from "mongoose";
import Devjobs from "../models/Devjobs.js"

export const getDevjobs = async (req, res) => {
  try {
      const devjobs = await Devjobs.find();
      res.status(200).json(devjobs)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const getDevjob = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const devjobs = await Devjobs.findById(_id);
      res.status(200).json(devjobs)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const createDevjob = async (req, res) => {
  const devjobs = req.body;
  const newDev = new Devjobs({...devjobs, creator: req.userId, createdAt: new Date().toISOString()})
  try {
    await newDev.save();
    res.status(201).json(newDev)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const updateDevjob = async (req, res) => {
  const { id: _id } = req.params;
  const devjobs = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No devjobs with that id')
  const updateDev = await Devjobs.findByIdAndUpdate(_id, {...devjobs, _id}, {new: true});

  res.json(updateDev)
}

export const deleteDevjob = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No devjobs with that id')

  await  Devjobs.findByIdAndRemove(_id);
  res.json({message: 'Devjobs deleted successfully'});
}

export const likeDev = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No devjobs with that id')

  const devjobs = await Devjobs.findById(_id);
  const updatedDev = await Devjobs.findByIdAndUpdate(_id, {likeCount: devjobs.likeCount + 1}, { new: true});

  res.json(updatedDev)
}

export const supportDevjob = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No devjobs with that id')

  const devjobs = await Devjobs.findById(_id);
  const updatedDev = await Devjobs.findByIdAndUpdate(_id, {supportCount: devjobs.supportCount + 1}, { new: true});

  res.json(updatedDev)
}

export const loveDevjob = async (req, res) => {
  const { id: _id } = req.params;

  if(!req.userId){
    res.json({message: 'Unauthenticated'});
  }else {
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No devjobs with that id')
    const devjobs = await Devjobs.findById(_id);
    const index = devjobs.loveDev.findIndex((id) => id === String(req.userId));
    if(index == -1){
      devjobs.loveCount.push(req.userId)
    }
    const Devjobs = await Devjobs.findByIdAndUpdate(
      _id, {loveCount: devjobs.loveCount + 1,
        devjobs
    }, { new: true});

    res.json(Devjobs)
  }
}


export const viewDevjob = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No devjobs with that id')

  const devjobs = await Devjobs.findById(_id);
  const updatedDevjob = await Devjobs.findByIdAndUpdate(_id, {viewCount: devjobs.viewCount + 1}, { new: true});

  res.json(updatedDevjob)
}


export const shareDevjob = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const devjobs = await Devjobs.findById(_id);
  const updatedDevjob = await Devjobs.findByIdAndUpdate(_id, {shareCount: devjobs.shareCount + 1}, { new: true});

  res.json(updatedDevjob)
}
