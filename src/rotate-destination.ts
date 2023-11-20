import {createStream, Options} from 'rotating-file-stream';

const generatorInit = (destination: string) => {
  return (time: number | Date, index?: number) => {
    const pad = (num: string | number) => (+num > 9 ? "" : "0") + +num;
    if (!time) return `${destination}/index.log`;

    if (typeof time === 'number') {
      time = new Date(time)
    }

    const month = pad(time.getMonth() + 1);
    const day = pad(time.getDate());

    return `${destination}/${time.getFullYear()}-${month}-${day}-${index}-index.log.gz`;
  };
}

const rotateDestination = (options: Options & {
  destination: string;
}) => {
  const { size, interval, maxFiles, maxSize } = options;
  return createStream(generatorInit(options.destination), {
    size: size || "1000B",
    interval: interval || "10m",
    compress: "gzip",
    maxFiles,
    maxSize
  });
}

export default rotateDestination
