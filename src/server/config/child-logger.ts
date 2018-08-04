import * as bunyan from "bunyan";
import * as RotatingFileStream from "bunyan-rotating-file-stream";

export const getLogger = (appname: any, errorLogFile: any, appLogFile: any) => {
  const appLogs = bunyan.createLogger({
    name: appname,
    streams: [
      {
        level: "info",
        stream: new RotatingFileStream({
          path: appLogFile,
          period: "1d",
          rotateExisting: true,
          threshold: "1g",
          gzip: true,
        }),
      },
      {
        level: "error",
        stream: new RotatingFileStream({
          path: errorLogFile,
          period: "1d",
          rotateExisting: true,
          threshold: "1g",
          gzip: true,
        }),
      },
    ],
  });
  return appLogs;
};
