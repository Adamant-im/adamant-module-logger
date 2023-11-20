"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path = __importStar(require("path"));
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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { logger } = yield (0, exports.createLogger)({ name: 'test' }, { destination: path.resolve(__dirname, 'logs') });
    let counter = 1;
    setInterval(() => {
        counter++;
        logger.info(`test ${counter}`);
    }, 1000);
});
void main();
//# sourceMappingURL=index.js.map