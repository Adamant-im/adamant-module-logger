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
exports.createLogger = void 0;
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const rotate_destination_1 = __importDefault(require("./rotate-destination"));
const createLogger = (options, rotateOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const streams = [
        {
            stream: yield (0, rotate_destination_1.default)(Object.assign({ interval: '1d', size: '10M', maxFiles: 10, maxSize: '20M' }, rotateOptions))
        },
        {
            stream: (0, pino_pretty_1.default)(),
        },
    ];
    const logger = (0, pino_1.default)(options, pino_1.default.multistream(streams));
    const middlewareLogger = (0, pino_http_1.default)({ logger });
    return { logger, middlewareLogger };
});
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map