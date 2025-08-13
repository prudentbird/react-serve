#!/usr/bin/env node

import { Command } from "commander";
import { createReactendApp } from "./create-app";
import { readFileSync } from "fs";
import { join } from "path";

const packageJson = JSON.parse(
  readFileSync(join(__dirname, "../package.json"), "utf8")
);

const program = new Command();

program
  .name("create-reactend")
  .description("Create a new Reactend application")
  .version(packageJson.version);

program
  .argument("[project-name]", "Name of the project")
  .option("-t, --template <template>", "Template to use", "basic")
  .action(async (projectName?: string, options?: { template: string }) => {
    try {
      await createReactendApp(projectName, options?.template || "basic");
    } catch (error) {
      console.error("Error creating Reactend app:", error);
      process.exit(1);
    }
  });

program.parse();
