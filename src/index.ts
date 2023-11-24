import pino, {DestinationStream, Level, type LoggerOptions, StreamEntry} from 'pino';
import pinoHttp from 'pino-http';
import pretty from 'pino-pretty'
import rotateDestination from "./rotate-destination";
import { type Options } from "rotating-file-stream";
import { spawn } from "child_process";

interface GelfOptions {
  host?: string;
  port?: number;
  protocol?: 'tcp' | 'http' | 'https' | 'udp'
}

export const createLogger = (
  options: LoggerOptions,
  rotateOptions: Partial<Options> & { destination: string },
  gelfOptions?: GelfOptions
) => {
  const streams = [
    {
      stream: rotateDestination({
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
  ] as (DestinationStream | StreamEntry<Level>)[] ;

  if (gelfOptions) {
    const args = ['log']

    if (gelfOptions.host) {
      args.push('-h', gelfOptions.host)
    }

    if (gelfOptions.port) {
      args.push('-p', gelfOptions.port.toString())
    }

    if (gelfOptions.protocol) {
      args.push('-P', gelfOptions.protocol)
    }

    const child = spawn('pino-gelf', args);

    streams.push({
      stream: child.stdin
    })
  }

  const logger = pino(options, pino.multistream(streams));

  const middlewareLogger = pinoHttp({
    logger,
    customReceivedObject: (req, res, object) => {
      console.log(res)
      return {
        ...object,
        // res: {
        //   ...object,
        //   body: ![200, 201, '200', '201'].includes(object?.res?.statusCode) ? res.body : undefined,
        // }
      }
    },
  });

  return { logger, middlewareLogger }
}
