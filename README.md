Brown Shib
==========

This is a wrapper around [Passport.js](http://passportjs.org/) and the [passport-saml](https://www.npmjs.com/package/passport-saml) authenication provider.

# Usage
Require the package and pass in a few configuration values.

```javascript
var browShib = require('brown-shib')(
  'https://localhost:8443',
  '/login/callback',
  null,
  false,
  'https://local.cis-dev.brown.edu/shibboleth-sp'
);
```

The returned object exposes `passport` for application setup.

```javascript
app.use(express.session({ secret: 'this should be secret' }));
app.use(brownShib.passport.initialize());
app.use(brownShib.passport.session());
```

Define authentiation routes using the returned object. 

```javascript
app.get('/login', brownShib.authenticate());

app.get('/login/callback', brownShib.authenticate({ successRedirect: '/', failureRedirect: '/error' });

app.get('/profile', function (req, res) {
  if (req.isAuthenticated()) {
    res.json(req.user);
  }
  res.redirect('/login');
});
```

NB: The exposed `authenticate` method is a partially bound version of Passport's `authenticate` [method](http://passportjs.org/docs/authenticate). When calling this you don't need to specify the stragey as the first argument. If you need access to the original method, you can still use `brownShib.passport.authenticate`.

# Example Application
To run the example application, provide a private key and certificate for the server in the `PRIV_KEY` and `CERT_FILE` environment variables and make sure node runs on port `8443`.

You can generate a self-signed key/cert pair with this command:

```javascript
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```
