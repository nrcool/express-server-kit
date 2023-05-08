#!/usr/bin/env node
import { spawn } from "node:child_process";

import logUpdate from "log-update";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
const startTime = new Date().getTime();
let [project_name] = process.argv.slice(2);
let rootPath;
if(project_name==="."){
    project_name = path.resolve(".").split("/").slice(-1).join("")
    rootPath=path.resolve(".")
}else{
    rootPath = path.resolve(".", project_name);
}
const exist = fs.pathExistsSync(rootPath);

if (exist) {
  const files = fs.readdirSync(rootPath);
  if (files.length > 0) {
    console.log(
      `Path ${chalk.green(rootPath)} not empty, ${chalk.red("aborting")}`
    );
    process.exit(1)
  }
} else {
  fs.mkdirSync(rootPath);
}



function start() {
  if (!project_name) {
    console.log(chalk.blue("argument missing ....."));
    console.group();
    console.log(chalk.green("express-server ."));
    console.log(
      `create express server in current director: (${chalk.green(process.cwd())})`
    );
    console.log("OR");
    console.log(chalk.green("express-server YOUR_PROJECT_NAME"));
    console.log(
      `create express server in YOUR_PROJECT_NAME director: (${chalk.green(process.cwd())}/YOUR_PROJECT_DIRECTO)`
    );
    console.groupEnd();
    return;
  }

    console.log("🚚 Bootstrapping Express app in", chalk.green(rootPath), "\n");

    const templatePath =`/usr/local/lib/node_modules/express-boilerplate/template/`
    copyAllFiles(templatePath, rootPath);
   


}

function done(project_name,startTime) {
  console.log(chalk.yellow('-----------------------------------------------'))
  console.log('Begin by typing:')
  console.group()
  console.log(chalk.blue('cd'), project_name)
  console.log(chalk.blue('npm run dev'))
  console.group()
  console.log('starts the development server (using nodemon 🧐)')
  console.groupEnd()
  console.log(chalk.blue('npm start'))
  console.group()
  console.log(`starts the server (using node 😁)`)
  console.groupEnd()
  console.groupEnd()
  console.log(chalk.yellow('-----------------------------------------------'))

  const endTime = new Date().getTime()
  const timeDifference = (endTime - startTime) / 1000
  console.log(`✅ Done in ${timeDifference} seconds ✨`)
  console.log('🌈 Happy hacking 🦄')
  
  console.log(chalk.yellow("Follow 🙋 me on github: https://github.com/nrcool"))
}

async function copyAllFiles(templatePath, rootPath) {
    try{
        await fs.copy(templatePath,rootPath) 
        console.log("copying files finished ...🚀");
      }
    
    catch(err){
        console.log(err.message)
    }
  try{
     await installDependencies(rootPath)
     const loading = [".", "..", "...", ".....","........"];
     let i = 0
     let inter = setInterval(()=>{
          logUpdate(
          `🤞 Installing node packages `,
          chalk.green(loading[i++ % loading.length])
        );
     },100)
    setTimeout(()=>{
        clearInterval(inter)
        done(project_name,startTime)
    },1000)
   
  }catch(err){
    console.log(err.message)
  }

}

function installDependencies(rootPath) {
  return new Promise((resolve, reject) => {
    let installation = spawn("npm", ["install"], {
      cwd: rootPath,
      shell: true,
    });
    let i = 0;
    installation.stdout.on("end", () => {
      resolve();
    });
    installation.stderr.on("error",(err)=>{
        if(err){
            reject(err)
        }
    })
  });
}


start();
