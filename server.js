// Import the functions from the collegeData module.
const { initialize, getAllStudents, getTAs, getCourses, getStudentByNumber, getStudentsByCourse } = require('./modules/collegeData');

// Set the port for the Express app
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

var path = require('path');

//for css files
app.use(express.static(path.join(__dirname, "public")));

// the rest of our server code...







// The route, "/", serves the home.html file as a response when a GET request is made to the root path of the server.
app.get("/", (req, res) => {
res.sendFile(__dirname + '/views/home.html');
});

// The route, "/about", serves the about.html file as a response when a GET request is made to the "/about" path of the server.
app.get("/about", (req, res) => {
return res.sendFile(__dirname + "/views/about.html");
});

// The route, "/htmlDemo", serves the htmlDemo.html file as a response when a GET request is made to the "/htmlDemo" path of the server.
app.get("/htmlDemo", (req, res) => {
return res.sendFile(__dirname + "/views/htmlDemo.html");
});


// Serve a JSON response containing students data when a GET request is made to the "/students" path of the server
app.get("/students", (req, res) => {
// Check if a "course" query parameter is present in the request


    
if (req.query.courses) {
// If "course" query parameter is present, call the getStudentsByCourse function with the course value
getStudentsByCourse(req.query.course).then((result) => {
// Return the result as a JSON response
return res.json(result)
}).catch((err) => {
// If there is an error, return a JSON response with a message of "no results"
return res.json({ message: "no results" })
});
}
// Check if there are no query parameters present in the request
else if (Object.keys(req.query).length === 0) {
// If no query parameters are present, call the getAllStudents function
getAllStudents().then((result) => {
// Return the result as a JSON response
return res.json(result)
}).catch((err) => {
// If there is an error, return a JSON response with a message of "no results"
return res.json({ message: "no results" })
});
}
// If a query parameter is present but it is not "course", return a JSON response with a message of "Query name is not supported"
else {
return res.json({ message: "Query name is not supported" })
}
});

// Serve a JSON response containing TA data when a GET request is made to the "/tas" path of the server
app.get("/tas", (req, res) => {
// Call the getTAs function
getTAs().then((result) => {
// Return the result as a JSON response
return res.json(result)
}).catch((err) => {
// If there is an error, return a JSON response with a message of "no results"
return res.json({ message: "no results" })
});

});



// Call the initialize function and start the server after the promise is resolved
initialize().then((result) => {
    // setup http server to listen on HTTP_PORT
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
}).catch((err) => {
    // Log an error message if the initialize function returns a rejected promise
    console.log("error: " + err)
});

// Return the result as a JSON response