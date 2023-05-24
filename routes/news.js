import express from "express";
import { getAllNews, getNews, createNews, deleteNews, updateNews, likeNews, supportNews, loveNews, viewNews, shareNews } from "../controllers/news.js";



const router = express.Router();

router.get('/', getAllNews)
router.get('/:id', getNews)
router.post('/', createNews);
router.delete('/:id', deleteNews);
router.patch('/:id', updateNews);
router.patch('/like/:id', likeNews);
router.patch('/support/:id', supportNews);
router.patch('love/:id', loveNews);
router.patch('/view/:id', viewNews);
router.patch('/share/:id', shareNews);


export default router;
