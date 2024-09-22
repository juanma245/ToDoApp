import express from 'express';
import { userRouter } from './routers/users.js';
import { taskRouter } from './routers/task.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const port = 3002;

//Configuración de cors
app.use(cors({
  origin : 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT','OPTIONS','PATCH'],
  credentials : true
}))

//middelweres y routers
app.use(express.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use('/task',taskRouter)

//Llamada de confirmación de la app
app.get('/', (req, res) => {
  res.send('Backend para la ToDo app');
});

//Levantar el servidor
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
});
