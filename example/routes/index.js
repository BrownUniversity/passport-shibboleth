var express = require('express');
var util = require('util');
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
    router.get('/login', brownShib.passport.authenticate(brownShib.strategy));

    router.post('/login/callback',
        brownShib.passport.authenticate(brownShib.strategy,
            {successRedirect: '/', failureRedirect: '/error'})
    );

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
    router.get('/logout', brownShib.passport.logout(brownShib.strategy));

    // router.get('/logout', brownShib.passport.logout(brownShib.strategy, { successRedirect: 'https://brown.edu' }));

    // router.get('/logout', function(req, res) {
    //     req.logout();
    //
    //     // do other things here
    //
    //     var successRedirect = req.protocol + '://' + req.get('host');
    //     res.redirect('https://sso.brown.edu/idp/shib_logout.jsp?return=' + successRedirect);
    // });

    return router;
}
