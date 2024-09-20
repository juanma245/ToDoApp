import express from 'express';
import { userRouter } from './routers/users.js';
import cookieParser from 'cookie-parser';
const app = express();
const port = 3002;

app.use(express.json())
app.use(cookieParser())
app.use('/user',userRouter)

app.get('/', (req, res) => {
  res.send('Backend para la ToDo app');
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
