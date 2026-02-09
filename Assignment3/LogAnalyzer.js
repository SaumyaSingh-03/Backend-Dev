const fs = require("fs");
const readline = require("readline");

const stream = fs.createReadStream("app.log");

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity
});

let stats = {
  INFO: 0,
  WARN: 0,
  ERROR: 0
};

rl.on("line", (line) => {
  if (line.startsWith("INFO")) stats.INFO++;
  else if (line.startsWith("WARN")) stats.WARN++;
  else if (line.startsWith("ERROR")) stats.ERROR++;
});

rl.on("close", () => {
  console.log("Log Summary:");
  console.log(stats);
});
