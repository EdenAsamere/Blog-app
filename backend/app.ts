import *as express from 'express';
import * as cors from 'cors';
import connectDB from './src/config/connectDB';
import post from './src/routes/postRoute';
import comment from './src/routes/commentRoute';
import user from './src/routes/userRoute';
import auth from './src/routes/authRoute';
import errorHandler from './src/middlewares/errorHandler';
import { authMiddleware } from './src/middlewares/authMiddleware';
import category from './src/routes/categoryRoute';

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/api/posts', post);
app.use('/api/auth/', auth);
app.use('/api/comment/', comment);
app.use('/api/category/', category);

app.use('/:api/user',authMiddleware,user)
app.use(errorHandler);

export default app;
