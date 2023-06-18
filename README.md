# LionCircuits-WebApp
This porject includes a Django + React Application for uploading and download Files and User Profile

# Project Name: WebApp

## Description
User Portal : This Application should have the following features
- Login page (with emailId and password, with validations)
- User upload page
- User should be able to upload file
- User should be able to see the list of files uploaded in a table (Filename, date
uploaded, file type- pdf,excel,txt)
- User should be able to download the file by clicking on the filename in the table
- Portal Details screen - This should display Total number of files uploaded, Toal number of
files of each type (ex: pdf, excel, word), Number of files uploaded by each user
- Show an user profile Icon at Top right, clicking on that UserProfile screen should be
displayed, where user can
- Add multiple addresses, with edit option
- Add and edit Phone number

## Requirements
- Install Python > https://www.python.org/downloads/
- Install NodeJS > https://nodejs.org/en/download
- Create a virtual environment in Python
-- python -m venv <environment_name> > python -m venv myenv

## Clone the repository
- Open a terminal or command prompt on your computer.
- Navigate to the directory where you want to clone the repository. Use the cd command to change directories. 
- For example, to navigate to the Documents directory, you can use: cd Documents
- Once you are in the desired directory, use the git clone command followed by the URL of the Git repository you want to clone. 
- For example: git clone 
- Once the cloning process is complete, you can navigate into the cloned repository directory using the cd command. 
- For example: cd example-repo


## Installation
- Backend (Django):
  - Change to the project's backend directory:
    ```
    cd WebApp/
    ```
  - Install Python packages using pip:
    ```
    pip install -r requirements.txt  // Make sure you are in the same directory where requirement.txt is available.
    ```

- Frontend (React):
  - Change to the project's frontend directory:
    ```
    cd reactjs_django/
    ```
  - Install Node.js packages using npm:
    ```
    npm install
    ```

## Run migrations
- Move inside the project directory where manage.py file is available
- Run the following command: python manage.py makemigrations
- Run the following command: python manage.py migrate


## Create superuser
- Then run the following command to create a user: python manage.py createsuperuser
- Specify the username, password, and confirm password fields

## Run the Django Server
- Then run the following command: python manage.py runserver

## Run the React App
- Move inside the react project directory: cd reactjs_django/
- Then run the following command: npm start

## Start using the webapp
- Open any browser
- Open any of the following URLs: http://127.0.0.1:3000/login/ or http://127.0.0.1:3000/


## Basic Workflow
- Use the user credentials that we created earliar 
- Under File Upload Section, you can upload file by just specifying the custom file name and selecting the file.
- Once you upload the file, it will be available under List of Uploaded Files section.
- Under File Statistics section, we can check the total number of files, file count for each file type, and number of files uploaded by each user.
- On clicking on the Profile option, USER PROFILE section will open, here we can add or update user details.
- In the end, if we click on the Logout option, the user will be automatically logged out.


