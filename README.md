# Passport Shibboleth

This is a wrapper around the [passport-saml](https://www.npmjs.com/package/passport-saml) authenication provider for [passport](http://passportjs.org/) that is preconfigured to work with Brown's Shibboleth Identity Provider.

## Install

```
npm i BrownUniversity/passport-shibboleth#semver:^4.0
yarn add BrownUniversity/passport-shibboleth#^4.0
```

## Usage

```javascript
const passport = require("passport"); // or "koa-passport"
const Strategy = require("passport-shibboleth").default;
const strategy = new Strategy({
  host: "https://localhost:8443",
  cbPath: "/login/callback",
  issuer: "https://local.cis-dev.brown.edu/shibboleth-sp"
});

passport.use(strategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(express.session({ secret: "this should be secret" }));
app.use(passport.initialize());
app.use(passport.session());
```

Define authentication routes using passport's `authenicate` method. After successful authentication, the `req` object will have a `user` property injected into it that will contain the user's attributes as provided by Shibboleth.

```javascript
app.get('/login', passport.authenticate("saml"));

app.post('/login/callback', passport.authenticate("saml", { successRedirect: '/', failureRedirect: '/error' });

app.get('/profile', function (req, res) {
  if (req.isAuthenticated()) {
    res.json(req.user);
  }
  res.redirect('/login');
});
```

## Example Application

See `./example/README.md`.
