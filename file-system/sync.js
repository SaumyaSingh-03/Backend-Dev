const fs = require("fs");
const path = require("path");

function syncDirectories(source, backup) {
  try {
    if (!fs.existsSync(backup)) {
      fs.mkdirSync(backup);
    }

    const files = fs.readdirSync(source);

    files.forEach(file => {
      const srcPath = path.join(source, file);
      const backupPath = path.join(backup, file);

      if (fs.statSync(srcPath).isFile()) {
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(srcPath, backupPath);
          console.log(`Copied: ${file}`);
        }
      }
    });

  } catch (err) {
    console.log("Error during synchronization:", err.message);
  }
}

syncDirectories("source", "backup");
