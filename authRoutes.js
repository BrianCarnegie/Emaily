//Modules Used
const passport = require('passport');

//Exporting the routes to be used in index.js
module.exports = (app) => {
    //Brings in the google scope of the profile properties we need
    app.get('/auth/google',  passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );
    
    //Authenticates the callback from google
    app.get('/auth/google/callback', passport.authenticate('google'));

    //Logging out of the application
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    //Route to test out the authenticated user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
