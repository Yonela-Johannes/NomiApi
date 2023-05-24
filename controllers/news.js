import mongoose from "mongoose";
import News from "../models/News.js"

export const getAllNews = async (req, res) => {
  try {
      const news = await News.find();
      res.status(200).json(news)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const getNews = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const news = await News.findById(_id);
      res.status(200).json(news)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

export const createNews = async (req, res) => {
  const news = req.body;
  const newNews = new News({...news, creator: req.userId, createdAt: new Date().toISOString()})
  try {
    await newNews.save();
    res.status(201).json(newNews)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const updateNews = async (req, res) => {
  const { id: _id } = req.params;
  const news = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No news with that id')
  const updatedNews = await News.findByIdAndUpdate(_id, {...news, _id}, {new: true});

  res.json(updatedNews)
}

export const deleteNews = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No news with that id')

  await  News.findByIdAndRemove(_id);
  res.json({message: 'News deleted successfully'});
}

export const likeNews = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No news with that id')

  const news = await News.findById(_id);
  const updatedNews = await News.findByIdAndUpdate(_id, {likeCount: news.likeCount + 1}, { new: true});

  res.json(updatedNews)
}

export const supportNews = async (req, res) => {
  const { id: _id } = req.params;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No news with that id')

  const news = await News.findById(_id);
  const updatedNews = await News.findByIdAndUpdate(_id, {supportCount: news.supportCount + 1}, { new: true});

  res.json(updatedNews)
}

export const loveNews = async (req, res) => {
  const { id: _id } = req.params;

  if(!req.userId){
    res.json({message: 'Unauthenticated'});
  }else {
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No news with that id')
    const news = await News.findById(_id);
    const index = news.loveBlog.findIndex((id) => id === String(req.userId));
    if(index == -1){
      news.loveCount.push(req.userId)
    }
    const updatedNews = await News.findByIdAndUpdate(
      _id, {loveCount: news.loveCount + 1,
        news
    }, { new: true});

    res.json(updatedNews)
  }
}


export const viewNews = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No news with that id')

  const news = await News.findById(_id);
  const updatedNews = await News.findByIdAndUpdate(_id, {viewCount: news.viewCount + 1}, { new: true});

  res.json(updatedNews)
}


export const shareNews = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No news with that id')

  const news = await News.findById(_id);
  const updatedNews = await News.findByIdAndUpdate(_id, {shareCount: news.shareCount + 1}, { new: true});

  res.json(updatedNews)
}
