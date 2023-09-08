const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const { level } = require('../config.json')

module.exports = winston.createLogger({
  level: level,
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.printf(
      log => {
        if(log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
        return  `[${log.timestamp}] [${log.level}] ${log.message}`;
      },
    ),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
        dirname: './logs',
        filename: 'roll-%DATE%.log',
        // datePattern: 'YYYY-MM-DD',
        // zippedArchive: true,
        // maxSize: '20m',
        maxFiles: '90d',
        auditFile: './logs/audit.json'
      }),
  ],
})
