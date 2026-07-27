import { Client } from "basic-ftp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const env = Object.fromEntries(
  readFileSync(path.join(root, ".env"), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const client = new Client();
client.ftp.verbose = false;

try {
  await client.access({
    host: env.FTP_HOST,
    port: Number(env.FTP_PORT || 21),
    user: env.FTP_USER,
    password: env.FTP_PASSWORD,
    secure: false,
  });

  await client.ensureDir(env.FTP_REMOTE_DIR);
  await client.clearWorkingDir();
  console.log(`Uploading out/ -> ${env.FTP_REMOTE_DIR} on ${env.FTP_HOST}`);
  await client.uploadFromDir(path.join(root, "out"));
  console.log("Deploy complete.");
} catch (err) {
  console.error("Deploy failed:", err.message);
  process.exitCode = 1;
} finally {
  client.close();
}
