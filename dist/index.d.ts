/// <reference types="node/http" />
/// <reference types="pino-http" />
import { type LoggerOptions } from 'pino';
import { type Options } from "rotating-file-stream";
export declare const createLogger: (options: LoggerOptions, rotateOptions: Partial<Options> & {
    destination: string;
}) => {
    logger: import("pino").Logger<LoggerOptions>;
    middlewareLogger: import("pino-http").HttpLogger<import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, {
        logger: import("pino").Logger<LoggerOptions>;
    }>;
};
