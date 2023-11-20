import { Options } from 'rotating-file-stream';
declare const rotateDestination: (options: Options & {
    destination: string;
}) => Promise<import("rotating-file-stream").RotatingFileStream>;
export default rotateDestination;
