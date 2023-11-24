/// <reference types="node/http" />
/// <reference types="pino-http" />
import { type LoggerOptions } from 'pino';
import { type Options } from "rotating-file-stream";
interface GelfOptions {
    host?: string;
    port?: number;
    protocol?: 'tcp' | 'http' | 'https' | 'udp';
}
export declare const createLogger: (options: LoggerOptions, rotateOptions: Partial<Options> & {
    destination: string;
}, gelfOptions?: GelfOptions) => {
    logger: import("pino").Logger<LoggerOptions>;
    middlewareLogger: import("pino-http").HttpLogger<import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, {
        logger: import("pino").Logger<LoggerOptions>;
        customReceivedObject: (req: import("http").IncomingMessage, res: import("http").ServerResponse<import("http").IncomingMessage>, object: any) => any;
    }>;
};
export {};
