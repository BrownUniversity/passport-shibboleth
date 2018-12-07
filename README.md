# Brown Shib

This is a wrapper around [Passport.js](http://passportjs.org/) and the [passport-saml](https://www.npmjs.com/package/passport-saml) authenication provider that is preconfigured to work with Brown's Shibboleth Identity Provider.

## Install

```
yarn add git+https://bitbucket.brown.edu/scm/node/shib.git#^1.0
```

### Required Peer Dependencies

These libraries are not bundled with Brown Shib and are required at runtime:

- [**passport**](https://www.npmjs.com/package/passport)
- [**passport-saml**](https://www.npmjs.com/package/passport-saml)

## Usage

```javascript
const passport = require("passport");
const browShib = require("brown-shib").default(passport,
  "https://localhost:8443",
  "/login/callback",
  null,
  null,
  "https://local.cis-dev.brown.edu/shibboleth-sp"
);
```

The returned object exposes `passport` for application setup.

```javascript
app.use(express.session({ secret: "this should be secret" }));
app.use(brownShib.passport.initialize());
app.use(brownShib.passport.session());
```

Define authentication routes using the exposed `authenicate` method. After successful authentication, the `req` object will have a `user` property injected into it that will contain the user's attributes as provided by Shibboleth.

```javascript
app.get('/login', brownShib.authenticate());

app.post('/login/callback', brownShib.authenticate({ successRedirect: '/', failureRedirect: '/error' });

app.get('/profile', function (req, res) {
  if (req.isAuthenticated()) {
    res.json(req.user);
  }
  res.redirect('/login');
});
```

NB: The exposed `authenticate` method is a partially bound version of Passport's `authenticate` [method](http://passportjs.org/docs/authenticate). When calling this you don't need to specify the stragey as the first argument. If you need access to the original method, you can still use `brownShib.passport.authenticate`.

## Example Application

See `./example/README.md`.
