export function notFoundRoute(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const message = status === 500 ? "Something went wrong. Please try again." : error.message;
  if (status === 500) console.error(error);
  res.status(status).json({ success: false, message });
}
