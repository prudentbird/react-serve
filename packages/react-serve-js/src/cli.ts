#!/usr/bin/env node

import { Command } from "commander";
import { spawn } from "child_process";
import path from "path";
import { existsSync } from "fs";

const program = new Command();

program
  .name("react-serve")
  .description("ReactServe CLI")
  .version("0.0.0");

function resolveTsxLaunch(): { cmd: string; args: string[] } {
  // Prefer local project installation
  const localBin = path.join(process.cwd(), "node_modules", ".bin", "tsx");
  if (existsSync(localBin)) return { cmd: localBin, args: [] };
  try {
    // Use package-resolved CLI entry when available
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const resolved = require.resolve("tsx/dist/cli.js");
    return { cmd: process.execPath, args: [resolved] };
  } catch (_) {
    // Fallback to PATH 'tsx'
    return { cmd: "tsx", args: [] };
  }
}

program
  .command("dev")
  .description("Run the ReactServe development server")
  .option("-p, --port <port>", "Port to run on (overrides App port)")
  .action(async (opts: { port?: string }) => {
    const { cmd, args: tsxArgs } = resolveTsxLaunch();
    const devRunner = path.join(__dirname, "dev-runner.js");

    const finalArgs: string[] = [...tsxArgs, devRunner];
    if (opts.port) {
      finalArgs.push("--port", String(opts.port));
    }

    const run = () => {
      const cp = spawn(cmd, finalArgs, { cwd: process.cwd(), stdio: "inherit" });
      cp.on("exit", (code) => {
        if (code === 0) setTimeout(run, 50);
        else process.exit(code === null ? 1 : code);
      });
    };

    run();
  });

program.parse();


