"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const routes_1 = require("./routes/routes");
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.use('/api/image', middleware_1.checkFormat, routes_1.imgResize);
exports.app.listen(port, () => {
    console.log(`Server listening on port localhost:${port}`);
});
