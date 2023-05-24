import mongoose from "mongoose";
import MusicEP from "../models/MusicEP.js"

export const getEps = async (req, res) => {
  try {
      const eps = await MusicEP.find();
      res.status(200).json(eps)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const getEp = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const ep = await MusicEP.findById(_id);
      res.status(200).json(ep)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const createEp = async (req, res) => {
  const post = req.body;
  const newEP = new MusicEP({...post, creator: req.userId, createdAt: new Date().toISOString()})
  try {
    await newEP.save();
    res.status(201).json(newEP)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const updateEp = async (req, res) => {
  const { id: _id } = req.params;
  const ep = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No ep with that id')
  const updateEP = await MusicEP.findByIdAndUpdate(_id, {...ep, _id}, {new: true});

  res.json(updateEP)
}

export const deleteEp = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No ep with that id')

  await  MusicEP.findByIdAndRemove(_id);
  res.json({message: 'MusicEP deleted successfully'});
}

export const likeEp = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No ep with that id')

  const ep = await MusicEP.findById(_id);
  const updatedEP = await MusicEP.findByIdAndUpdate(_id, {likeCount: ep.likeCount + 1}, { new: true});

  res.json(updatedEP)
}

export const supportEp = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No ep with that id')

  const ep = await MusicEP.findById(_id);
  const updatedEP = await MusicEP.findByIdAndUpdate(_id, {supportCount: ep.supportCount + 1}, { new: true});

  res.json(updatedEP)
}

export const loveEp = async (req, res) => {
  const { id: _id } = req.params;

  if(!req.userId){
    res.json({message: 'Unauthenticated'});
  }else {
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No ep with that id')
    const ep = await MusicEP.findById(_id);
    const index = ep.loveBlog.findIndex((id) => id === String(req.userId));
    if(index == -1){
      ep.loveCount.push(req.userId)
    }
    const updatedEP = await MusicEP.findByIdAndUpdate(
      _id, {loveCount: ep.loveCount + 1,
        ep
    }, { new: true});

    res.json(updatedEP)
  }
}


export const viewEp = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No ep with that id')

  const ep = await MusicEP.findById(_id);
  const updatedEP = await MusicEP.findByIdAndUpdate(_id, {viewCount: ep.viewCount + 1}, { new: true});

  res.json(updatedEP)
}


export const shareEp = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const ep = await MusicEP.findById(_id);
  const updatedEP = await MusicEP.findByIdAndUpdate(_id, {shareCount: ep.shareCount + 1}, { new: true});

  res.json(updatedEP)
}
