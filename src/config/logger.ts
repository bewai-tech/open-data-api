import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { addColors } from 'winston/lib/winston/config';

import config from './config';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'gray',
    debug: 'blue',
    silly: 'grey'
};

const errorsTransport: DailyRotateFile = new DailyRotateFile({
    filename: 'bewai-error-%DATE%.log',
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error'
});

const accessTransport: DailyRotateFile = new DailyRotateFile({
    filename: 'bewai-access-%DATE%.log',
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

addColors(colors);

const winstonFormat = format.combine(
    format.colorize({
        all: true
    }),
    format.label({
        label: '[LOGGER]'
    }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.align(),
    format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    )
);

const winstonLogger = createLogger({
    level: 'debug',
    levels,
    format: winstonFormat,
    exitOnError: false
});

if (config.nodeEnv !== 'production') {
    winstonLogger.add(new transports.Console());
} else {
    winstonLogger.add(errorsTransport);
    winstonLogger.add(accessTransport);
}

export default winstonLogger;
