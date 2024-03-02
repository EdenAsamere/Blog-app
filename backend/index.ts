import express from 'express';
import connectDB from '../backend/src/config/connectDB';
import post from './src/routes/postRoute';
import comment from './src/routes/commentRoute';
import user from './src/routes/userRoute';
import auth from './src/routes/authRoute';
import * as dotenv from 'dotenv';
import errorHandler from '../backend/src/middlewares/errorHandler';
import { authMiddleware } from '../backend/src/middlewares/authMiddleware';
import category from './src/routes/categoryRoute';

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use('/api/posts', post);
app.use('/api/auth/', auth);
app.use('/api/comment/', comment);
app.use('/api/category/', category);

app.use('/:api/user',authMiddleware,user)
// app.use(authMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});