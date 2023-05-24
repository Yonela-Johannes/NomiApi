import express from 'express';
import { getDevelopers, getDeveloper, updateDeveloper, deleteDeveloper, createDeveloper } from '../controllers/developers.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GETTING ARTIST
router.get('/', getDevelopers);
// CREATE A ARTIST
router.post('/', createDeveloper)
// CREATE ARTIST
router.get('/:id', getDeveloper);
// UPDATE ARTIST
router.patch('/:id', updateDeveloper);
// DELETE ARTIST
router.delete('/:id', deleteDeveloper);

export default router
