# Guide for Running and Managing the Angular App

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Node.js: Visit [nodejs.org](https://nodejs.org) and follow the instructions to install Node.js.
- npm: npm is bundled with Node.js, so once you have Node.js installed, npm will be available automatically.

You can proceed to the next part once you have Node.js and npm installed.

## Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/superscale-task-mgmt-assignment.git
cd superscale-task-mgmt-assignment
npm install
```

## Running the App

To run the Angular app locally, use the following command:

```bash
npm start
```

This will build the application and start a development server. Open your web browser and navigate to http://localhost:4200 to view the app.

## Running Unit Tests

To run unit tests for the Angular app, use the following command:

```bash
npm run test
```

This will execute the unit tests using your default test runner.

You can find test coverage reports at /coverage/superscale-mgmt

## Analyzing Webpack Bundles

To analyze the Webpack bundles and get insights into the size and composition of your app, use the following command:

```bash
npm run analyze
```

This will launch the Webpack Bundle Analyzer tool and open it in your default web browser.

## Generating the API

To generate the latest version of the API for the app, use the following command:

```bash
npm run generate:api
```

This command will fetch and generate the latest version of the API, ensuring that your app interacts with the most up-to-date API endpoints.

Please note, there might be a need to reoload your code editor.

## Building and Running the Docker Image

To build and run the Docker image for the Angular app, follow these steps:

Build the Docker image:

```bash
docker build -t superscale-task-mgmt-assignment .
```

Run the Docker container:

```bash
docker run -p 80:80 --name superscale-task-mgmt-assignment-container superscale-task-mgmt-assignment
```
