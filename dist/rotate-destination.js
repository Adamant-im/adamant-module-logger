"use strict";
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
const rotateDestination = (options) => {
    const { size, interval, maxFiles, maxSize } = options;
    return (0, rotating_file_stream_1.createStream)(generatorInit(options.destination), {
        size: size || "1000B",
        interval: interval || "10m",
        compress: "gzip",
        maxFiles,
        maxSize
    });
};
exports.default = rotateDestination;
//# sourceMappingURL=rotate-destination.js.map