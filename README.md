
# IBM-Challenge
## Space Xplore

### Task
Build a flickr web-app that fetches images from Nasa's account via the Flickr API ([API details](https://github.com/ibmfrontend/fedexercise/blob/master/API_DETAILS.md)). You are welcome to use any technology to build it and design the layout in any way that you see fit.

### URL: http://72.182.77.134:3001/

### Description
> I created a web app for the fictitious summer space camp Space Xplore. The aim of the web app is to act as the web front for the summer camp providing information on the camp and its activities.

### Web Pages
 - Home Page
 - Sign Up Page
 - About Us Page
 - Contact Us Page
 - Activities Page
 - Login Page

### Components
 - Node JS
 - Express JS
 - Mongo DB
 - Bootstrap 3

### Functionality
 - On server start photo database is created using the Flickr API inside the Express JS server
 - All photos in web app are from the Flickr API
 - Activities on the Activities page can be sorted via the filter input box
 - Via express routes photo information is accessible to the browser
 - On Login credentials are verified on the server and action is taken on result of success/failure
 - On Login a session is created for the user to maintain login credentials
 - Invalid Logins are reported with reason for failure
 - On Sign Up a new user is created and stored into the mongo db database 
 - Invalid Sign Ups are reported with reason for failure
 - Errors are available for every failed request including input validation