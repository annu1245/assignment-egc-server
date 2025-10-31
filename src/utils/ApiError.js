class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = null) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export default ApiError;