import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const IMGS_DIR = path.join(__dirname, '../../Asset/images');
const RESIZED_IMGS_DIR = path.join(__dirname, '../../Asset/resizeImg');

if (!fs.existsSync(RESIZED_IMGS_DIR)) {
  fs.mkdirSync(RESIZED_IMGS_DIR);
}

export const imgResize = async (req: Request, res: Response) => {
  const { width, height, imageName } = req.query;

  if (!width || !height || !imageName) {
    res
      .status(400)
      .send('Please input parameters: width, height and imageName'); //
    return;
  }

  const widthInt = parseInt(width as string);
  const heightInt = parseInt(height as string);

  if (isNaN(widthInt) || widthInt <= 0) {
    res.status(400).send('Please input the width is integers'); //
    return;
  }

  if (isNaN(heightInt) || heightInt <= 0) {
    res.status(400).send('Please input the height is integers'); //
    return;
  }

  try {
    const imagePath = path.join(IMGS_DIR, imageName as string);
    const resizedImagePath = path.join(
      RESIZED_IMGS_DIR,
      `${imageName}_${width}x${height}.jpg`
    );

    if (!fs.existsSync(imagePath)) {
      res.status(404).send('Image not found');
      return;
    }

    if (fs.existsSync(resizedImagePath)) {
      res.sendFile(resizedImagePath);
    } else {
      await sharp(imagePath)
        .resize(widthInt, heightInt)
        .toFile(resizedImagePath);
      res.sendFile(resizedImagePath);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while resizing the image.'); //
  }
};
