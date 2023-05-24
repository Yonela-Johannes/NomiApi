import express from 'express';
import {
  getVideos,
  addVideo,
  getVideo,
  trend,
  random,
  supporters,
  getMusic,
  getStory,
  getBlog,
  getReel,
  getByTag,
  search,
  deleteVideo,
  updateVideo
} from '../controllers/videos.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// add video
router.post('/', addVideo);
// get all videos
router.get('/', getVideos);
// get a video
router.get('/:id', getVideo);
// delete a video
router.delete('/:id', auth, deleteVideo);
//update a video
router.patch('/:id', auth, updateVideo);


// Get videos by categories
router.get('/reels', auth, getReel);
router.get('/blogs', getBlog);
router.get('/story', auth, getStory);
router.get('/music', getMusic);
router.get('/trend', trend);
router.get('/random', random);
router.get('/supporters', auth, supporters);
router.get('/tag', search);
router.get('/search', getByTag);

export default router
