#!/usr/bin/env node
import { spawn } from "node:child_process";
import { fileURLToPath } from "url";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { createRequire } from "module";

// ESM-compatible require for resolving paths
const require = createRequire(import.meta.url);

// Resolve the current script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startTime = new Date().getTime();
let [project_name] = process.argv.slice(2);
let rootPath;

// Determine the project root path
if (project_name === ".") {
  project_name = path.basename(process.cwd());
  rootPath = process.cwd();
} else {
  rootPath = path.resolve(process.cwd(), project_name);
}

// Ensure destination directory is valid
if (fs.existsSync(rootPath)) {
  const files = fs.readdirSync(rootPath);
  if (files.length > 0) {
    console.log(
      `Path ${chalk.green(rootPath)} not empty, ${chalk.red("aborting")}`
    );
    process.exit(1);
  }
} else {
  fs.mkdirSync(rootPath, { recursive: true });
}

function start() {
  if (!project_name) {
    console.log(chalk.blue("❌ Missing argument"));
    console.group();
    console.log(chalk.green("Usage: express-server <project_name>"));
    console.log(
      `Create an Express server in the specified directory: (${chalk.green(
        process.cwd()
      )}/YOUR_PROJECT_NAME)`
    );
    console.groupEnd();
    return;
  }

  console.log("🚀 Bootstrapping Express app in", chalk.green(rootPath), "\n");

  // Find the template path dynamically
  let templatePath;
  try {
    // 1️⃣ First, check if the package is installed globally or locally
    const packagePath = path.dirname(
      require.resolve("express-server-kit/package.json")
    );
    templatePath = path.join(packagePath, "template");
  } catch (err) {
    // 2️⃣ If resolution fails, assume we're running from `npm link`
    const linkedTemplatePath = path.resolve(__dirname, "../template"); // Adjusted for `npm link`

    if (fs.existsSync(linkedTemplatePath)) {
      templatePath = linkedTemplatePath;
    } else {
      console.log(
        chalk.red("❌ Cannot find `express-server-kit`. Is it installed?")
      );
      console.log(
        chalk.yellow(
          "If testing locally, use `npm link` inside the package folder."
        )
      );
      process.exit(1);
    }
  }

  console.log(`📁 Using template path: ${chalk.blue(templatePath)}`);
  copyAllFiles(templatePath, rootPath);
}

async function copyAllFiles(templatePath, rootPath) {
  try {
    console.log(
      `🔄 Copying files from ${chalk.yellow(templatePath)} to ${chalk.green(
        rootPath
      )}...`
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error(`❌ Template path does not exist: ${templatePath}`);
    }

    await fs.copy(templatePath, rootPath);
    console.log("✅ Files copied successfully! 🚀");
  } catch (err) {
    console.log(chalk.red(`❌ Copy Error: ${err.message}`));
    process.exit(1);
  }

  try {
    await installDependencies(rootPath);
    done(project_name, startTime);
  } catch (err) {
    console.log(chalk.red(`❌ Installation Error: ${err.message}`));
  }
}

function installDependencies(rootPath) {
  return new Promise((resolve, reject) => {
    console.log(chalk.yellow("📦 Installing dependencies..."));
    const installation = spawn("npm", ["install"], {
      cwd: rootPath,
      shell: true,
      stdio: "inherit",
    });

    installation.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("Failed to install dependencies"));
      }
    });
  });
}

function done(project_name, startTime) {
  console.log(chalk.yellow("-----------------------------------------------"));
  console.log("✅ Setup Complete! Start your project with:");
  console.group();
  console.log(chalk.blue(`cd ${project_name}`));
  console.log(chalk.blue("npm run dev"));
  console.group();
  console.log("Starts the development server (using nodemon 🧐)");
  console.groupEnd();
  console.log(chalk.blue("npm start"));
  console.group();
  console.log("Starts the server in production mode (using Node.js 🚀)");
  console.groupEnd();
  console.groupEnd();
  console.log(chalk.yellow("-----------------------------------------------"));

  const endTime = new Date().getTime();
  const timeDifference = (endTime - startTime) / 1000;
  console.log(`✨ Done in ${timeDifference} seconds! 🎉`);
  console.log("🌈 Happy coding! 🚀");

  console.log(chalk.yellow("Follow me on GitHub: https://github.com/nrcool"));
}

start();
