import { app } from '../index';
import request from 'supertest';

describe('Check Resize Image Success, it will return status 200', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `/api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });

  it('should return a status code of 200', async () => {
    expect(response.status).toBe(200);
  });
});

describe('Check middleware', () => {
  let response: request.Response;
  const imageName = 'image.pnt';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `/api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });

  it('should return a status code of 400', async () => {
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid file extension');
  });
});

describe('Check Image Exist ', () => {
  let response: request.Response;
  const imageName = 'imgTest.png';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `/api/image?imageName=${imageName}&width=${width}&height=${height}`
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
      `/api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });
  it('should return a status code of 400', async () => {
    expect(response.status).toBe(400);
    expect(response.text).toBe('Please input the width is integers');
  });
});

describe('Check query height', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 100;
  const height = 'b';

  beforeEach(async () => {
    response = await request(app).get(
      `/api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });
  it('should return a status code of 400', async () => {
    expect(response.status).toBe(400);
    expect(response.text).toBe('Please input the height is integers');
  });
});

describe('Check resize image', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `/api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });

  it('should resize the image based on the provided query parameters', async () => {
    expect(response.status).toBe(200);
  });
});

describe('error occurred while resizing the image', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 900000;
  const height = 900000;

  beforeEach(async () => {
    response = await request(app).get(
      `/api/image?imageName=${imageName}&width=${width}&height=${height}`
    );
  });
  it('should return a status code of 500', async () => {
    expect(response.status).toBe(500);
    expect(response.text).toBe('Error occurred while resizing the image.');
  });
});
