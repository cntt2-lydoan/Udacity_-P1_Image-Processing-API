"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
const supertest_1 = __importDefault(require("supertest"));
describe('Check middleware', () => {
    let response;
    const imageName = 'imgTest.pnx';
    const width = 100;
    const height = 100;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        response = yield (0, supertest_1.default)(index_1.app).get(`api/image?imageName=${imageName}&width=${width}&height=${height}`);
    }));
    it('should return a status code of 400', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid file extension');
    }));
    it('should call the next middleware', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.status).toBe(200);
        expect(response.ok).toBe(true);
    }));
});
describe('Check Image Exist ', () => {
    let response;
    const imageName = 'imgTest.png';
    const width = 100;
    const height = 100;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        response = yield (0, supertest_1.default)(index_1.app).get(`api/image?imageName=${imageName}&width=${width}&height=${height}`);
    }));
    it('should return a status code of 404', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.status).toBe(404);
        expect(response.text).toBe('Image not found');
    }));
});
describe('Check query width', () => {
    let response;
    const imageName = 'image.png';
    const width = 'a';
    const height = 100;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        response = yield (0, supertest_1.default)(index_1.app).get(`api/image?imageName=${imageName}&width=${width}&height=${height}`);
    }));
    it('should return a status code of 400', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.status).toBe(400);
        expect(response.text).toBe('Width must be positive integers');
    }));
});
describe('Check query height', () => {
    let response;
    const imageName = 'image.png';
    const width = 100;
    const height = 'b';
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        response = yield (0, supertest_1.default)(index_1.app).get(`api/image?imageName=${imageName}&width=${width}&height=${height}`);
    }));
    it('should return a status code of 400', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.status).toBe(400);
        expect(response.text).toBe('Height must be positive integers');
    }));
});
describe('Check resize image', () => {
    let response;
    const imageName = 'image.png';
    const width = 100;
    const height = 100;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        response = yield (0, supertest_1.default)(index_1.app).get(`api/image?imageName=${imageName}&width=${width}&height=${height}`);
    }));
    it('should resize the image based on the provided query parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.status).toBe(200);
    }));
});
