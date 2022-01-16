# Buzzer-Full-Stack-Development-Assessment

This project is a coding challange provided by the company Buzzer. The purpose is to develop a social media platform to demonstrate my ability to use React and NodeJS. This program uses a mock data set that contains user's posts. The program allows a user to navigate and filter the data using React and NodeJS.

The server is enabled for cors, or proxy in development is an option but not required.

For educational purposes only.

## Demo
Check out the demo hosted at https://buzzerreact.joshuaduma.ca/

Access the headless API at https://buzzerapi.joshuaduma.ca/

## Development Instructions

Run `npm install` to install the packages in the root directory.

Run `cd website` then `npm install` to install the packages in the website directory.

Run `node api.js` to run the server on port 4111.

Navigate to `cd ./website` to run the React website in development.

Run `npm start` to start the React website in development.

## Server Instructions

Run `pm2 start api.js --name buzzerapi --watch` and `pm2 save` to save the configuration.

To run the website, move the website build to the server using rsync.

Then run `pm2 start main.js --name buzzerreact --watch` and `pm2 save` to save the configuration.
