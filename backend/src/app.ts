// src/app.ts
import express from 'express';
import {collectionRoute,subtasksrouter,tasksrouter} from './routes';
import errorHandler from './middleware/errorHandler';
import logger from './middleware/logger';
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);  // Logger middleware is already included
app.use('/api/collection', collectionRoute);
app.use('/api/tasks', tasksrouter);
app.use('/api/subtasks', subtasksrouter);
app.use(errorHandler);

export default app;