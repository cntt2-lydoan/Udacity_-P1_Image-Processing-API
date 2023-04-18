import express from 'express';
import { checkFormat } from './middleware';
import { imgResize } from './routes/routes';

export const app = express();
const port = 3000;

app.use('/api/image', checkFormat, imgResize);

app.listen(port, () => {
  console.log(`Server listening on port localhost:${port}`);
});
