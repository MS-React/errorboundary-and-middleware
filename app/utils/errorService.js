const Logger = require('js-logger');
Logger.useDefaults();
/* istanbul ignore next */
if(process.env.NODE_ENV === 'production') {
  Logger.setLevel(Logger.OFF);
}

// Log unhandled errors
window.onerror = logErrors;

export function logErrors(error) {
  Logger.error(error);
  return false;
}
