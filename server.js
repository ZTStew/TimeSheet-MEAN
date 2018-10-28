let path = require("path");                                                     // tells app to require path
let express = require("express");                                               // tells app to require express
let session = require("express-session");                                       // tells app to require session
let flash = require("express-flash");                                           // tells app to require flash
let bodyParser = require("body-parser");                                        // tells app to require body-parser
let mongoose = require("mongoose");                                             // tells app to require mongoose
let port = 8000;                                                                // creates a variable called port and sets it  to be 8000

let app = express();                                                            // tells app to use express

app.use(bodyParser.urlencoded({extended:true}));                                // allows bodyParser to work with more complex functions(if set to false, it will be more shallow and unable to work with things like nested functions)
app.use(express.json());                                                        // tells app to use express in json format
app.use(express.static(path.join(__dirname,'/client/dist/client')));            // tells app to use the staic folder at the written route
app.use(flash());                                                               // tells app to use flash

app.use(session({                                                               // tells app to use session
    secret:"suuppeer ssekkrreett kkeey",                                        // creates a secret key
    resave:false,                                                               // sets resave to be false(resave makes it so that even if the session is unchanged after a user leaves a page, the session is saved)
    saveUnitialized:true,                                                       // sets saveUnitialized to be true(creates a session for a new user even if they do not modify the session on the site)
    cookie: { maxAge: 60000 }                                                   // creates a cookie and sets its life span
}));

require("./server/config/mongoose.js");                                         // tells app that it requires mongoose.js from the route given
require("./server/config/routes.js")(app);                                      // tells app that it requires routes.js from the route given

app.listen(port, function(){                                                    // tells app to listen on the value of port that was created on line 7
    console.log("Running port", port)                                           // confirms that the server is running and the port it is running on
});