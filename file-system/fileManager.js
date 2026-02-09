const fs = require("fs");
const path = require("path");

const [,, command, ...args] = process.argv;

switch (command) {
  case "read":
    console.log(fs.readFileSync(args[0], "utf-8"));
    break;

  case "write":
    fs.writeFileSync(args[0], args.slice(1).join(" "));
    console.log("File written successfully");
    break;

  case "copy":
    fs.copyFileSync(args[0], args[1]);
    console.log("File copied");
    break;

  case "delete":
    fs.unlinkSync(args[0]);
    console.log("File deleted");
    break;

  case "list":
    fs.readdirSync(args[0] || ".").forEach(file => console.log(file));
    break;

  default:
    console.log("Commands: read | write | copy | delete | list");
}
