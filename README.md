
![boilerplate](/boilerplate.png)

# express-server-kit

[![VERSION](https://img.shields.io/badge/version-1.0.1-brightgreen)](https://www.npmjs.com/package/express-server-kit)

[![LICENSE](https://img.shields.io/badge/LICENSE-MIT-orange)](https://www.npmjs.com/package/express-server-kit)

[![AUTHOR](https://img.shields.io/badge/AUTHOR-NAQVI-yellow)](https://www.npmjs.com/package/express-server-kit)
# Express-Server Boilerplate

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine.

## Installation 🏭

```bash
$ npm install -g express-server-kit
```
OR

```bash
$ npx express-server-kit project_name
```
## Quick Start 🏃‍♂️

The quickest way to get started with express is to utilize the executable `express-server` to generate an application as shown below:

 create (and start) the app (in `project_name` folder):

```bash
$ express-server project_name
$ cd project_name
$ npm run dev
```
OR Create (and start) the app in current folder:

```bash
$ express-server .
$ npm run dev
```

This will basically create this structure in your folder

```bash
.....................................
├── .env
├── .gitignore
├── app.js
├── node_modules
|    └── ....
├── package-lock.json
├── package.json
├── routes
|    └── indexRoute.js
|    └── userRoutes.js
├── controllers
|    └── indexControllers.js
|    └── userControllers.js.js
├── models
|    └── userModels.js
├── views
|    └── index.html
.....................................
```

## Environment Variables

The environment variables can be found and modified in the  `.env`  file. They come with these default values:

```js
#port
PORT=4000

#mongodb uri
URI=mongodb://127.0.0.1:27017

#mongodb database
DB=my_database
``` 

## What dependencies it installs ?

- **express** - express framework
- **mongoose** - Mongoose(MongoDB object modeling tool) 
- **dotenv** - for env variables
- **cors** - enable CORS 
- **http-errors** - to create http errors
- **morgan** - to log http requests
- **nodemon** (dev) - monitors changes in files

## Author ✍️
[**Naqvi 🇩🇪  **](https://github.com/nrcool)

## Contribute 🤝

You can fork this repo and send me a PR.
