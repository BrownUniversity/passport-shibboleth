var express = require("express");
var url = require("url");
var passport = require("passport");
var router = express.Router();

module.exports = function(strategy) {
  /* GET home page. */
  router.get("/", function(req, res) {
    res.render("index", {
      title: "Brown Shib Example",
      user: req.isAuthenticated() ? req.user : null
    });
  });

  // Redirect the user to the Shibboleth IdP
  router.get("/login", passport.authenticate("saml"));

  // Handle the Shibboleth POST
  router.post(
    "/login/callback",
    passport.authenticate("saml", {
      successRedirect: "/",
      failureRedirect: "/error"
    })
  );

  // Render the user's profile or start auth flow if user is not authenticated.
  // res.user contains the user information returned by Shibboleth
  router.get("/profile", function(req, res) {
    if (req.isAuthenticated()) {
      res.render("profile", { user: req.user });
    } else {
      res.redirect("/login");
    }
  });

  /**
   * strategy.logout does three things:
   *  - Kills the local session (req.logout())
   *  - Redirects to the Shibboleth IdP to kill its session (https://sso.brown.edu/idp/shib_logout.jsp)
   *  - Provides a return url to the IdP to control where it redirects to (?return=<URL>).
   *    If not provided, this defaults to the baseUrl of the request.
   *
   * You can set the return url by passing an options object with a successRedirect parameter.
   * Alternatively, if you need complete control over the logout functionality,
   * you can write a custom logout responder. Just don't forget to kill both
   * the local and IdP sessions. Example below.
   */
  router.get("/logoutWithDefaultRedirect", strategy.logout());

  router.get(
    "/logoutWithExplicitRedirect",
    strategy.logout({ successRedirect: "https://brown.edu" })
  );

  router.get(
    "/logoutWithBeforeMiddleware",
    function(req, res, next) {
      // Do something here before the session is killed
      // (ex. log last ativity time)
      var activity = new Date();
      // eslint-disable-next-line no-console
      console.log(
        req.user.firstName + " logged out at: " + activity.toString()
      );

      // Then call next()
      next();
    },
    strategy.logout()
  );

  router.get("/customLogout", function(req, res) {
    // Kill local session
    req.logout();

    // Do other, custom things here

    // Kill IdP session and redirect to index page
    var redirect = url.format({
      protocol: req.protocol,
      host: req.get("Host"),
      pathname: "/"
    });
    res.redirect(
      "https://sso.brown.edu/idp/shib_logout.jsp?return=" +
        encodeURIComponent(redirect)
    );
  });

  return router;
};
