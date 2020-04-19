import { createLogger, format, transports } from 'winston';

export default createLogger({
    format: format.json(),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
})