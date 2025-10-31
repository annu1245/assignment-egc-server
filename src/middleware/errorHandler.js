const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error"
  const errors = err.errors || null
  
  res.status(statusCode).json({
    message,
    errors
  });

}

export default errorHandler;