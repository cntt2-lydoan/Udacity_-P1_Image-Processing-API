"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFormat = void 0;
var path_1 = __importDefault(require("path"));
var ALLOWED_IMAGE_FORMATS = ['png', 'jpg'];
var checkFormat = function (req, res, next) {
    var imageName = req.query.imageName;
    var imageFormat = path_1.default.extname(imageName).slice(1);
    if (!ALLOWED_IMAGE_FORMATS.includes(imageFormat)) {
        res.status(400).send('Invalid format');
        return;
    }
    next();
};
exports.checkFormat = checkFormat;
