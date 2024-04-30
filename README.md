# Teachers Data Table and Dashboard README

## Overview
This project comprises a web-based interface that serves both as a data table displaying information about teachers and a dashboard offering additional functionality. Users can access this interface through the provided link: [172.20.94.26/](http://172.20.94.26/).

## Features
- **Data Table**: The main feature of the interface is a table that displays detailed information about teachers.
- **Responsive Design**: The interface is designed to be responsive, ensuring optimal viewing experience across various devices.
- **Search Functionality**: The data table includes a search feature allowing users to search for specific information about teachers.

## Accessing the Interface
To access the interface, navigate to the provided link: [172.20.94.26/](http://172.20.94.26/). Upon loading the page, users will find themselves on the dashboard, which serves as the entry point to various functionalities.

## Dashboard
- **Login**: Users can log in using their credentials through the provided link: [172.20.94.26](http://172.20.94.26). If no user session is detected, users will be redirected to the sign-in page: [172.20.94.26/forms/signin.html](http://172.20.94.26/forms/signin.html).
- **Change Password**: Once logged in, users can change their passwords through the link: [172.20.94.26/dashboard/change_password.html](http://172.20.94.26/dashboard/change_password.html).

## Data Table
- **Accessing Teachers Data**: Users can access the detailed information about teachers through the provided link on the dashboard.
- **Search Feature**: The data table includes a search functionality allowing users to search for specific information about teachers.

## User Session and Timed Refresh
- **User Session**: User session information is stored in local storage.
- **Timed Refresh**: A timed refresh occurs every 5 minutes to ensure the user session remains active and up-to-date.

.
# Installation Guide

# 1. Clone the Repository
git clone <repository-url>

# 2. Open in Visual Studio Code
cd <repository-directory>
code .

# 3. Run Live Server
# Install the Live Server extension in Visual Studio Code (if not already installed)
# Open the index.html file of the web application in Visual Studio Code
# Right-click on the HTML file and select "Open with Live Server" to run the web pages

# 4. Install TypeScript
npm install -g typescript

# 5. Convert TypeScript to JavaScript
cd <repository-directory>/ts
tsc <your-file>.ts

# Replace <repository-url> with the URL of your repository
# Replace <repository-directory> with the path to your cloned repository directory
# Replace <your-file>.ts with the name of your TypeScript file
