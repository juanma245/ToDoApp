import express from 'express';
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Backend para la ToDo app');
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
