import { Request, Response, NextFunction } from 'express';
import path from 'path';

const IMAGE_FORMATS = ['png', 'jpg'];

export const checkFormat = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { imageName } = req.query;
  const imageFormat = path.extname(imageName as string).slice(1);

  if (!IMAGE_FORMATS.includes(imageFormat)) {
    res.status(400).send('Invalid format');
    return;
  }

  next();
};
