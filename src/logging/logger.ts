import * as winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || 'development'; // set node environment to development
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

const format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);
  
const errorTransport = new winston.transports.File({
    filename: 'logs/error.log', // file for error-specific logging
    level: 'error',
});

const infoTransport = new winston.transports.File({
    filename: 'logs/all.log', // file for all errors logging
    level: 'http',
});
  
export const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports: [errorTransport, infoTransport],
});

winston.addColors(colors);