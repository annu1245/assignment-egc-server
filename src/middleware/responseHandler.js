const responseHandler = (req, res, next) => {
  res.success = (statusCode = 200, message, data = null) => {
    return res
    .status(statusCode)
    .json({ message, data });
  };
  next();
};

export default responseHandler;