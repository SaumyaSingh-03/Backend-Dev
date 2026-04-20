const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${res.statusCode} | ${Date.now() - start}ms\n`;

    const filePath = path.join(__dirname, "../../logs.txt");

    fs.appendFile(filePath, log, (err) => {
      if (err) console.error("Logging error:", err);
    });
  });

  next();
};

module.exports = logger;