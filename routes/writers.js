import express from 'express';
import { getWriters, getWriter, updateWriter, deleteWriter, createWriter } from '../controllers/writers.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GETTING ARTIST
router.get('/', getWriters);
// CREATE A ARTIST
router.post('/', createWriter)
// CREATE ARTIST
router.get('/:id', getWriter);
// UPDATE ARTIST
router.patch('/:id', updateWriter);
// DELETE ARTIST
router.delete('/:id', deleteWriter);

export default router
