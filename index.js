//Modules Used
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
//Keys File
const keys = require('./config/keys');

//Models
require('./models/User');


//Services
require('./services/passport');

//Mongo Connection
mongoose.connect(keys.mongoURI);

const app = express();

//Middlewares
//Using cookie session and setting required values
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]  
  })  
);
//Allowing passport to use cookies and sessions
app.use(passport.initialize());
app.use(passport.session());


//Routes
require('./routes/authRoutes')(app);



//Running the server on port 3000 or env port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on 5000...')
});