import errorsMiddleware from './errorsMiddleware';

describe('errors middleware for redux', () => {
  const store = {};
  const next = jest.fn();

  function setup(action) {
    errorsMiddleware(store)(next)(action);
  }

  beforeEach(() => {
    errorService.logErrors = jest.fn();
  });

  afterEach(() => {
    errorService.logErrors.mockClear();
  });

  describe('failed actions', () => {
    // Arrange
    const action = {
      type: 'some failed',
      payload: 'error'
    };

    it('should call next handler', () => {
      // Act
      setup(action);

      // Assert
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should call errorService', () => {
      // Act
      setup(action);
      expect(errorService.logErrors).toHaveBeenCalledTimes(1);
    });

    it('should call errorService with expected parameters', () => {
      // Act
      setup(action);

      // Assert
      expect(errorService.logErrors).toHaveBeenCalledWith(action.payload);
    });
  });
  describe('non failed Actions', () => {
    it('should not call error Service', () => {
      // Arrange
      const action = {
        type: 'some action Successful',
        payload: 'error'
      };

      // Act
      setup(action);

      // Assert
      expect(errorService.logErrors).toHaveBeenCalledTimes(0);
    });
  });
});
