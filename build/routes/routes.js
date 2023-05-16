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
exports.imgResize = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const IMGS_DIR = path_1.default.join(__dirname, '../../Asset/images');
const RESIZED_IMGS_DIR = path_1.default.join(__dirname, '../../Asset/resizeImg');
if (!fs_1.default.existsSync(RESIZED_IMGS_DIR)) {
    fs_1.default.mkdirSync(RESIZED_IMGS_DIR);
}
const imgResize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { width, height, imageName } = req.query;
    if (!width || !height || !imageName) {
        res
            .status(400)
            .send('Please input parameters: width, height and imageName');
        return;
    }
    const widthInt = parseInt(width);
    const heightInt = parseInt(height);
    if (isNaN(widthInt) || widthInt <= 0) {
        res.status(400).send('Please input the width is integers');
        return;
    }
    if (isNaN(heightInt) || heightInt <= 0) {
        res.status(400).send('Please input the height is integers');
        return;
    }
    try {
        const imagePath = path_1.default.join(IMGS_DIR, imageName);
        const resizedImagePath = path_1.default.join(RESIZED_IMGS_DIR, `${imageName}_${width}x${height}.jpg`);
        if (!fs_1.default.existsSync(imagePath)) {
            res.status(404).send('Image not found');
            return;
        }
        if (fs_1.default.existsSync(resizedImagePath)) {
            fs_1.default.unlinkSync(resizedImagePath);
        }
        yield (0, sharp_1.default)(imagePath).resize(widthInt, heightInt).toFile(resizedImagePath);
        res.status(200);
        res.sendFile(resizedImagePath);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while resizing the image.');
    }
});
exports.imgResize = imgResize;
