import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import writerRoutes from './routes/writers.js';
import userRoutes from './routes/users.js';
import artistRoutes from './routes/artists.js';
import developerRoutes from './routes/developer.js';
import devjobsRoutes from './routes/devjobs.js';
import devRoutes from './routes/devs.js';
import entrepreneurRoutes from './routes/entrepreneurs.js';
import postRoutes from './routes/posts.js';
import adminRoutes from './routes/admins.js';
import blogRoutes from './routes/blogs.js';
import newsRoutes from './routes/news.js';
import commentRoutes from './routes/videoComments.js';
import videoRoutes from './routes/videos.js';
import musicRoutes from './routes/music.js';
import imageRoutes from './routes/images.js';
import reelRoutes from './routes/reel.js';
import ownerRoutes from './routes/owner.js';
import epsRoutes from './routes/eps.js';
import postCommentRoutes from './routes/postComments.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';

const app = express();
dotenv.config();

app.use(cookieParser())
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/admins', adminRoutes);

app.use('/api/writers', writerRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/developers', developerRoutes);
app.use('/api/entrepreneurs', entrepreneurRoutes);

app.use('/api/posts', postRoutes);
app.use('/api/news',  newsRoutes);
app.use('/api/blogs',  blogRoutes);
app.use('/api/devs',  devRoutes);
app.use('/api/devjobs',  devjobsRoutes);
app.use('/api/videos', videoRoutes);

app.use('/api/songs', musicRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/extended_plays', epsRoutes);

// app.use('/api/comments', commentRoutes);
// app.use('/api/comments', postCommentRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
