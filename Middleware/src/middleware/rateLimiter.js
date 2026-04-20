const requestCounts = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();
  const windowTime = 60 * 1000; // 1 minute
  const maxRequests = 5;

  if (!requestCounts[ip]) {
    requestCounts[ip] = [];
  }

  // Remove old timestamps
  requestCounts[ip] = requestCounts[ip].filter(
    (timestamp) => currentTime - timestamp < windowTime
  );

  // Check limit
  if (requestCounts[ip].length >= maxRequests) {
    return res.status(429).json({
      message: "Too many requests. Try again later.",
    });
  }

  // Add current request
  requestCounts[ip].push(currentTime);

  next();
};

module.exports = rateLimiter;
