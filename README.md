# CPSC 471 Winter 2022 Project: Fly Fishing

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Tools and Technologies](#tools-and-technologies)
- [Authors](#authors)
- [Resources](#resources)

## Description
This a full stack application that allows users interested in fly fishing to store their expeditions in various ways, such as logging every fish they catch, what fly they used, the weather conditions, etc. We are hoping that fly fishers are able to use this application to catch the fish that they want.\
This project uses `React`as its frontend, and `MySQL` as the backend.

# Tools and Technologies
The following languages and tools were used to build our project:
- ReactJS (JavaScript)
- Node.js
- CSS
- MySQL


# Installation
## Step 1. Node.js
Download Node.js – LTS (Long Term Support) version is recommended for most users
\
After that, open up your terminal and check if `Node` is installed:
```
$ node -v
v16.13.0
```
Also, check if `npm` is installed, which comes with `Node`
```
$ npm -v
8.1.0
```

## Step 2. Clone GitHub Repository
Enter the following on the terminal of your device to download the project:
```
$ git clone https://github.com/Joey-mi/social-engineering-quiz/tree/main-page
```

## Step 3. JSON File
Go to the ```package.json``` file and go to "script" to confirm that you have the following:
```javascript
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

## Step 4: Install the Required Dependencies
Apply the following command in your terminal before starting the application.

```
$ npm install
```
This will download all the dependencies defined in the ```package.json``` file and into a ```node_modules``` folder.\
This folder will created in the root directory of the ```social-engineering-quiz``` folder in your local machine

## Step 5. Download External Libaries
Also, apply the following external libraries in your terminal before starting the application:
```
$ npm install axios
$ npm install @naterial-ui/core
```

## Step 6: Running the Project
Go to the root directory of the project and then start the app like so:
```
$ cd 471_API_Project            // first, go to root directory of the project...
$ npm start                     // then, start the frontnend side of the app
```
After that, open http://localhost:3000 to view the application in your browser.

In a second terminal, do the following
```
$ cd backend                    // first, go to backend directory of the project...
$ npm main.js                   // then, run the backend
```
Now, the frontend and the backend properties of the project are running.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Authors
This project was made by Computer Science Undergraduate students from the University of Calgary
as a final project for the CPSC 471 Winter 2022 course. \
Here is the list of authors:

- [Ryab Smit](https://github.com/rbsmit82)
- [Gabriela Wcislo](https://github.com/gabrielawcislo) 
- [Anish Pokhrel](https://github.com/apokhrel7)

# Resources
- https://fullstackopen.com/en/
- https://www.w3schools.com/nodejs/nodejs_mysql.asp
- https://www.mysqltutorial.org/mysql-nodejs/create-table/
- https://www.youtube.com/c/PedroTechnologies/videos
- https://www.youtube.com/channel/UC-Zcse8tC53G34Uo4kzLeAg
- https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server
- https://www.educba.com/mysql-commands/
- https://medium.com/fullstackwebdev/a-guide-to-mysql-with-node-js-fc4f6abce33b 

