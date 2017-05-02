var express = require('express');
var util = require('util');
var url = require('url');
var router = express.Router();

module.exports = function (brownShib) {
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Brown Shib Example',
            user: req.isAuthenticated() ? req.user : null
        });
    });

		// Redirect the user to the Shibboleth IdP
    router.get('/login', brownShib.authenticate(brownShib.strategy));

    // Handle the Shibboleth POST
    router.post('/login/callback', brownShib.authenticate(brownShib.strategy, {successRedirect: '/', failureRedirect: '/error'}));

    router.get('/profile', function (req, res) {
        if (req.isAuthenticated()) {
            res.render('profile', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });

    /**
     * brownShib.passport.logout does three things:
     *  - Kills the local session (req.logout())
     *  - Redirects to the idp to kill its session (https://sso.brown.edu/idp/shib_logout.jsp)
     *  - Provides a return url to the idp to control where it redirects to (?return=<URL>).
     *    If not provided, this defaults to the host you provided when creating the brownShib object.
     *
     * You can set the return url by passing an options object with a successRedirect parameter.
     * Alternatively, if you want to be responsible for killing both sessions (don't forget the IDP session!)
     * you can write a custom logout responder. Examples below.
     */
    router.get('/logoutWithDefaultRedirect', brownShib.logout());

    router.get('/logoutWithExplicitRedirect', brownShib.logout({ successRedirect: 'https://brown.edu' }));

    router.get('/logoutWithBeforeMiddleware', function(req, res, next) {
        // Do something here before the session is killed
        // (ex. log last ativity time)
        var activity = new Date();
        console.log(req.user.firstName + ' logged out at: ' + activity.toString());

        // Then call next()
        next();
    }, brownShib.logout());

    router.get('/customLogout', function(req, res) {
        // Kill local session
        req.logout();
    
        // Do other, custom things here
    
        // Kill IdP session and redirect to index page
        var redirect = url.format({
          protocol: req.protocol,
          host: req.get('Host'),
          pathname: '/'
        });
        res.redirect('https://sso.brown.edu/idp/shib_logout.jsp?return=' + encodeURIComponent(redirect));
    });

    return router;
}
