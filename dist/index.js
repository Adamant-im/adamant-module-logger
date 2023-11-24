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
const child_process_1 = require("child_process");
const createLogger = (options, rotateOptions, gelfOptions) => {
    const streams = [
        {
            stream: (0, rotate_destination_1.default)(Object.assign({ interval: '1d', size: '10M', maxFiles: 10, maxSize: '20M' }, rotateOptions))
        },
        {
            stream: (0, pino_pretty_1.default)(),
        },
    ];
    if (gelfOptions) {
        const args = ['log'];
        if (gelfOptions.host) {
            args.push('-h', gelfOptions.host);
        }
        if (gelfOptions.port) {
            args.push('-p', gelfOptions.port.toString());
        }
        if (gelfOptions.protocol) {
            args.push('-P', gelfOptions.protocol);
        }
        const child = (0, child_process_1.spawn)('pino-gelf', args);
        streams.push({
            stream: child.stdin
        });
    }
    const logger = (0, pino_1.default)(options, pino_1.default.multistream(streams));
    const middlewareLogger = (0, pino_http_1.default)({ logger });
    return { logger, middlewareLogger };
};
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map