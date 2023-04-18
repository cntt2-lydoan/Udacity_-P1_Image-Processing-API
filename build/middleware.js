"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFormat = void 0;
const path_1 = __importDefault(require("path"));
const IMAGE_FORMATS = ['png', 'jpg'];
const checkFormat = (req, res, next) => {
    const { imageName } = req.query;
    const imageFormat = path_1.default.extname(imageName).slice(1);
    if (!IMAGE_FORMATS.includes(imageFormat)) {
        res.status(400).send('Invalid format');
        return;
    }
    next();
};
exports.checkFormat = checkFormat;
