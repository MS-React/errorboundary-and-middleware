const errorsMiddleware = (/** store */) => next => action => {
  if (action.type.toLowerCase().includes('failed')) {
    errorService.logErrors(action.payload);
  }
  next(action);
};

export default errorsMiddleware;
