import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join, resolve } from "path";
import { existsSync } from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

export async function createReactendApp(
  projectName?: string,
  template = "basic"
) {
  try {
    // Get project name if not provided
    if (!projectName) {
      projectName = await ask("Project name: ");
    }

    if (!projectName) {
      console.error("❌ Project name is required");
      process.exit(1);
    }

    const projectPath = resolve(process.cwd(), projectName);

    // Check if directory already exists
    if (existsSync(projectPath)) {
      const overwrite = await ask(
        `Directory "${projectName}" already exists. Overwrite? (y/N): `
      );
      if (
        overwrite.toLowerCase() !== "y" &&
        overwrite.toLowerCase() !== "yes"
      ) {
        console.log("Aborted.");
        process.exit(0);
      }
    }

    console.log(`\n🚀 Creating ReactServe app in ${projectPath}...\n`);

    // Create project directory
    await mkdir(projectPath, { recursive: true });

    // Copy template files
    await copyTemplate(template, projectPath);

    // Update package.json with project name
    await updatePackageJson(projectPath, projectName);

    console.log("✅ Project created successfully!\n");
    console.log("Next steps:");
    console.log(`  cd ${projectName}`);
    console.log("  npm install");
    console.log("  npm run dev");
    console.log(`\n🌐 Your app will be running at http://localhost:6969\n`);
  } finally {
    rl.close();
  }
}

async function copyTemplate(template: string, projectPath: string) {
  const templatePath = join(__dirname, "../templates", template);

  if (!existsSync(templatePath)) {
    console.error(`❌ Template "${template}" not found`);
    process.exit(1);
  }

  await copyDirectory(templatePath, projectPath);
}

async function copyDirectory(src: string, dest: string) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      const content = await readFile(srcPath, "utf8");
      await writeFile(destPath, content);
    }
  }
}

async function updatePackageJson(projectPath: string, projectName: string) {
  const packageJsonPath = join(projectPath, "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));

  packageJson.name = projectName;

  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
