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
Object.defineProperty(exports, "__esModule", { value: true });
const rotating_file_stream_1 = require("rotating-file-stream");
const generatorInit = (destination) => {
    return (time, index) => {
        const pad = (num) => (+num > 9 ? "" : "0") + +num;
        if (!time)
            return `${destination}/index.log`;
        if (typeof time === 'number') {
            time = new Date(time);
        }
        const month = pad(time.getMonth() + 1);
        const day = pad(time.getDate());
        return `${destination}/${time.getFullYear()}-${month}-${day}-${index}-index.log.gz`;
    };
};
const rotateDestination = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, interval, maxFiles, maxSize } = options;
    const stream = (0, rotating_file_stream_1.createStream)(generatorInit(options.destination), {
        size: size || "1000B",
        interval: interval || "10m",
        compress: "gzip",
        maxFiles,
        maxSize
    });
    yield new Promise((res) => stream.once('open', () => res()));
    return stream;
});
exports.default = rotateDestination;
