import { app } from './../index';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
const RESIZED_IMGS_DIR = path.join(__dirname, '../../Asset/resizeImg');

describe('Check middleware', () => {
  let response: request.Response;
  const imageName = 'imgTest.pnx';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });

  it('should return a status code of 400', async () => {
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid file extension');
  });

  it('should call the next middleware', async () => {
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
  });
});

describe('Check Image Exist ', () => {
  let response: request.Response;
  const imageName = 'imgTest.png';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });

  it('should return a status code of 404', async () => {
    expect(response.status).toBe(404);
    expect(response.text).toBe('Image not found');
  });
});

describe('Check query width', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 'a';
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });
  it('should return a status code of 400', async () => {
    expect(response.status).toBe(400);
    expect(response.text).toBe('Width must be positive integers');
  });
});

describe('Check query height', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 100;
  const height = 'b';

  beforeEach(async () => {
    response = await request(app).get(
      `api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });
  it('should return a status code of 400', async () => {
    expect(response.status).toBe(400);
    expect(response.text).toBe('Height must be positive integers');
  });
});

describe('Check resize image', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });

  it('should resize the image based on the provided query parameters', async () => {
    expect(response.status).toBe(200);
  });
});
