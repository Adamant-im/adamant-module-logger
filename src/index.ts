import * as path from "path";
import pino, { type LoggerOptions } from 'pino';
import pinoHttp from 'pino-http';
import pretty from 'pino-pretty'
import rotateDestination from "./rotate-destination";
import { type Options } from "rotating-file-stream";

export const createLogger = async (options: LoggerOptions, rotateOptions: Partial<Options> & { destination: string }) => {
  const streams = [
    {
      stream: await rotateDestination({
        interval: '1d',
        size: '10M',
        maxFiles: 10,
        maxSize: '20M',
        ...rotateOptions
      })
    },
    {
      stream: pretty(),
    },
  ];

  const logger = pino(options, pino.multistream(streams));

  const middlewareLogger = pinoHttp({ logger });

  return { logger, middlewareLogger }
}


const main = async () => {
  const { logger } = await createLogger({ name: 'test' }, { destination: path.resolve(__dirname, 'logs') })
  let counter = 1
  setInterval(() => {
    counter++
    logger.info(`test ${counter}`)
  }, 1000)
}

void main()

