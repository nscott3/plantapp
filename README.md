# PlantApp

## Introduction
Welcome to PlantApp, your one-stop solution for plant enthusiasts! This guide will help you set up the project and get it running on your local machine.

## Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)

## Installing MongoDB Community Server

### Step 1: Download MongoDB
Windows:
1. Visit the [MongoDB Community Server Download Page](https://www.mongodb.com/try/download/community).
2. Select version 7.0 and your operating system.
3. Download the appropriate package.

MacOS:
1. Ensure homebrew is installed on your machine
2. Tap the MongoDB Homebrew Tap to download the official Homebrew formula for MongoDB
   and the Database Tools, by running the following command in your macOS Terminal:
   brew tap mongodb/brew

### Step 2: Install MongoDB
Windows:
1. Run the downloaded installer.
2. Follow the installation prompts.
3. Select "Install MongoDB as a Service" when prompted.
4. Complete the installation and click "Finish."

MacOS:
1. If you have already done this for a previous installation of MongoDB, you can skip this step.
   To update Homebrew and all existing formulae:
   brew update
2. To install MongoDB, run the following command in your macOS Terminal application:
   brew install mongodb-community@7.0

### Step 3: Start the MongoDB server
Windows:
1. Open a Command Prompt window as an administrator.
2. Navigate to the bin directory of your MongoDB installation. The default location is typically C:\Program Files\MongoDB\Server\<version>\bin. (Replace <version> with your actual MongoDB version number).
3. Run the following command:
   mongod --config="<path\_to\_your\_config\_file>"
4. Replace <path_to_your_config_file> with the actual path to your configuration file. If you
   haven't created one, you can use the default settings by omitting the –config argument.

MacOS:
1. In order to start the MongoDB server, you can use the command -
   brew services start mongodb-community

## Setting Up the Project

### Step 1: Clone the Repository
git clone https://github.com/nscott3/plantapp.git
cd plantapp

### Step 2: Install Dependencies
npm install

### Step 3: Start the application
npm start

### Step 4: Access the application
http://localhost:3000

