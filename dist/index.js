"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const rotate_destination_1 = __importDefault(require("./rotate-destination"));
const createLogger = (options, rotateOptions) => {
    const streams = [
        {
            stream: (0, rotate_destination_1.default)(Object.assign({ interval: '1d', size: '10M', maxFiles: 10, maxSize: '20M' }, rotateOptions))
        },
        {
            stream: (0, pino_pretty_1.default)(),
        },
    ];
    const logger = (0, pino_1.default)(options, pino_1.default.multistream(streams));
    const middlewareLogger = (0, pino_http_1.default)({ logger });
    return { logger, middlewareLogger };
};
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map