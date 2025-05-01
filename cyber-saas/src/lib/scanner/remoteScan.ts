// src/lib/scanner/remoteScan.ts

import { Client } from "ssh2";

type RemoteScanOptions = { domain: string };

export const runRemoteScan = ({ domain }: RemoteScanOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    let output = "";

    conn
      .on("ready", () => {
        conn.exec(`bash ~/scan.sh ${domain}`, (err: Error | undefined, stream: any) => {

          if (err) return reject(err);
          stream
            .on("data", (data: Buffer) => {
              output += data.toString();
            })
            .on("close", () => {
              conn.end();
              resolve(output);
            });
        });
      })
      .on("error", reject)
      .connect({
        host: process.env.SSH_HOST!,
        port: 22,
        username: process.env.SSH_USER!,
        privateKey: Buffer.from(process.env.SSH_PRIVATE_KEY!, "base64").toString("utf-8"),
      });
  });
};
