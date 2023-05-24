import express from 'express';
import { getArtists, getArtist, updateArtist, deleteArtist, createArtist } from '../controllers/artists.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GETTING ARTIST
router.get('/', getArtists);
// CREATE A ARTIST
router.post('/', createArtist)
// CREATE ARTIST
router.get('/:id', getArtist);
// UPDATE ARTIST
router.patch('/:id', updateArtist);
// DELETE ARTIST
router.delete('/:id', deleteArtist);

export default router
