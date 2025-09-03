import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join, resolve } from "path";
import { existsSync } from "fs";
import readline from "readline";
import https from "https";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function getLatestVersion(packageName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}/latest`;
    
    const request = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const packageInfo = JSON.parse(data);
          if (packageInfo.version) {
            resolve(packageInfo.version);
          } else {
            reject(new Error('Version not found in package info'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });

    // Set timeout for the request
    request.setTimeout(5000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

export async function createReactServeApp(
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

    // Get latest version of react-serve-js
    console.log("📦 Fetching latest version of react-serve-js...");
    let latestVersion: string;
    try {
      latestVersion = await getLatestVersion("react-serve-js");
      console.log(`✅ Latest version: ${latestVersion}\n`);
    } catch (error) {
      console.warn("⚠️  Could not fetch latest version, using fallback version 0.6.0");
      console.warn(`    Error: ${error instanceof Error ? error.message : String(error)}`);
      latestVersion = "0.6.0";
    }

    // Copy template files
    await copyTemplate(template, projectPath);

    // Update package.json with project name and latest react-serve-js version
    await updatePackageJson(projectPath, projectName, latestVersion);

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

async function updatePackageJson(projectPath: string, projectName: string, latestVersion: string) {
  const packageJsonPath = join(projectPath, "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));

  packageJson.name = projectName;
  
  // Update react-serve-js to the latest version
  if (packageJson.dependencies && packageJson.dependencies["react-serve-js"]) {
    packageJson.dependencies["react-serve-js"] = `^${latestVersion}`;
  }

  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
