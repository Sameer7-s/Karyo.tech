import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isWindows = process.platform === "win32";

function run(name, command, args) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: isWindows,
    env: process.env,
    cwd: root,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
      process.exit(code);
    }
  });

  return child;
}

console.log("Starting KARYO backend (port 5000) and frontend (port 3000)...\n");

const backend = run("backend", "node", ["--watch", "backend/server.js"]);
const frontend = run("frontend", "npm", ["run", "dev"]);

function shutdown() {
  backend.kill();
  frontend.kill();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
