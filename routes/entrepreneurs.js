import express from 'express';
import { getEntrepreneurs, getEntrepreneur, updateEntrepreneur, deleteEntrepreneur, createEntrepreneur } from '../controllers/entrepreneur.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GETTING ARTIST
router.get('/', getEntrepreneurs);
// CREATE A ARTIST
router.post('/', createEntrepreneur)
// CREATE ARTIST
router.get('/:id', getEntrepreneur);
// UPDATE ARTIST
router.patch('/:id', updateEntrepreneur);
// DELETE ARTIST
router.delete('/:id', deleteEntrepreneur);

export default router
