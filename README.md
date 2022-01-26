# project5
Harvard web development project5

## Background
South Africa's roads have become increasingly bad over the years with numerous potholes, burst water pipes along roads and robots (traffic lights) not working.
Due to various reasons such as management, finances and resources 
a good majority of these incidents do not get fixed in a timely manner or at all depending on the incidents location. 

## Idea Behind the Project
Building an application to crowd source road incidents such as accidents, potholes, burst water pipes, road works and broken robots (traffic lights) 
will not only let other drivers know which areas are bad and can then avoid them but can be intergrated into a municipalities or State Owned Enterprise system
so that they can see exactly where work needs to be done. This may also improve their management systems as often incidents will be reported as fixed on their side
whereas they have in actuality not been fixed. 

## How it works
Any signed in user can click on the map to add a road incident which will be added to the map and visually displayed as a point. 
A popup will appear on the point prompting the user to select what kind of road incident they have experianced from the available options
(pothole, accident, road works, broken robot (traffic light) and burst pipe).
Once the user has submitted the form the point will be recorded on the map and added to the incidents log.
The incidents log is a record of all points that have ever been recorded and will show the
name of the user that added the point, what kind of incident it was and the date it was added. 
Any signed in user can remove a point by clicking on the point itself.
This will remove the point from the map and add the user who removed it, what incident it was and the removed date onto the incident log.

## Distinctiveness and Complexity
The application uses Django as the back-end and JavaScript as the front-end. 
Two models were created one for Users and one for Points which will be used to record and store any data captured from the front-end.
A JavaScript library called Leaflet was used to create the map and handle all of the interactions with the map such as clicking on the map to record a point, clicking on a point to remove it from the map and loading all of the points and incidents in the incident log that have been previsouly recorded.

Throughout this course the projects have been surrounding business and social media like applications whereas 
this project is centered around WebGIS and integrating maps and spatially based data into a form that is usable and readable by any user.

## What is Contained in Each File
- Views
- Urls
- Models
- Admin
- Templates
- Static
- Other

### Views
The views are functions that run on the server-side and return web pages or responses to the front-end via API calls.

### Urls
The applications paths that allow for navigating to different parts / pages of the application and paths for the API.

### Models
A model is in essance a table in a database where information about a particular thing can be stored. 
In this application models were created for Users and Points.

### Admin
Allows for the models to be registered with the Django Admin site for the particular application.

### Templates
Templates is a folder created in the project to store all of the HTML files. The contents of the HTML files are what is shown on the clients browser. 
This would be the basic structure of the web page.

### Static
Static is a folder created within the project that stores the CSS, JavaScript files for the project.

Within this projects static directory there is a style.css file, incidents.js file and five png images.

The style.css file provides all of the style for the created HTML files and is responsible for how the HTML page is displayed in the browser.
The incidents.js file contains all of the code for the front-end of the application. 
The five png images are for the five categories a user can choose from when recording a road incident and is used to style the point once the form has been submitted.

### Other

**Dockerfile**\
A file to create an image based on an existing Python image for the Django project.

**docker-compose**\
A YAML file for connecting multiple containers together so that they can all be started and stopped at the same time.

**requirements.txt**\
A simple text file that contains all of the requirements and dependencies for the project. 

## Running the Application
First navigate into the projects directory \
If you have Docker isntalled you can execute `docker-compose up` in your terminal and the application will start up 
go to 0.0.0.0:8000 in your browser to view the application. \
Else execute `python3 manage.py runserver` in your terminal and while holding down Ctrl on your keyboard click on the link the server provides.
This will open the application in your browser. 