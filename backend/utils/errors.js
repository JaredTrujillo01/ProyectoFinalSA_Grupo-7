class ApplicationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
class NotFoundError extends ApplicationError { constructor(msg='Not found'){ super(msg, 404);} }
class ValidationError extends ApplicationError { constructor(msg='Validation error'){ super(msg, 400);} }

module.exports = { ApplicationError, NotFoundError, ValidationError };
