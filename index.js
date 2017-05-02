var fs = require('fs'),
    passport = require('passport'),
    samlStrategy = require('passport-saml').Strategy,
    config = require('./config'),
    url = require('url');

module.exports = function (host, cbPath, privateKeyPath, attributeMap, issuer) {
    // Recommend/ensure private key file
    if (typeof privateKeyPath === 'undefined') {
        console.log('Warning: A RSA private key is recommended for this package.');
    }
    if (typeof privateKeyPath === 'string' && ! fs.existsSync(privateKeyPath)) {
        throw new Error('Private key file does not exist: ' + privateKeyPath);
    }

    // Handle missing attributeMap
    if (typeof attributeMap === 'string' && typeof issuer === 'undefined') {
        issuer = attributeMap;
        attributeMap = {};
    }

    // Merge attributeMap with defaults
    if (typeof attributeMap !== 'object') {
        attributeMap = {};
    }
    attributeMap = Object.assign({
        'urn:oid:1.3.6.1.4.1.6537.1.19': 'uuid',
        'urn:oid:2.16.840.1.113730.3.1.241': 'displayName',
        'urn:oid:2.5.4.42': 'firstName',
        'urn:oid:2.5.4.4': 'lastName',
        'urn:oid:1.3.6.1.4.1.6537.1.15': 'authId',
        'urn:oid:1.3.6.1.4.1.6537.1.14': 'netId',
        'urn:oid:1.3.6.1.4.1.5923.1.1.1.6': 'eppn',
        'urn:oid:1.3.6.1.4.1.6537.1.13': 'brownId',
        'urn:oid:1.3.6.1.4.1.6537.1.16': 'bannerId',
        'urn:oid:1.3.6.1.4.1.6537.1.68': 'advanceId',
        'urn:oid:2.5.4.12': 'title',
        'urn:oid:2.5.4.11': 'department',
        'urn:oid:1.3.6.1.4.1.6537.1.28': 'brownType',
        'urn:oid:1.3.6.1.4.1.5923.1.1.1.5': 'primaryAffiliation',
        'urn:oid:1.3.6.1.4.1.5923.1.1.1.1': 'affiliations',
        'urn:oid:1.3.6.1.4.1.6537.1.25': 'status',
        'urn:oid:1.3.6.1.4.1.5923.1.5.1.1': 'isMemberOf'
    }, attributeMap);

    // Basically no-ops
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // Handles mapping attributes
    var strategy = new samlStrategy(
        config(host, cbPath, privateKeyPath, issuer),
        function (profile, done) {
            var prof = {};

            for (var a in attributeMap) {
                if (a in profile) {
                    prof[attributeMap[a]] = profile[a];
                }
            }

            return done(null, prof);
        }
    );
    passport.use(strategy);

    passport.logout = function (options) {
        options = options || {};

        return function (req, res) {
            var parsed = url.parse(options.successRedirect || '/');
            var redirect = (parsed.host ? parsed.protocol + '//' + parsed.host : host) + parsed.path;
            req.logout();
            return res.redirect('https://sso.brown.edu/idp/shib_logout.jsp?return=' + encodeURIComponent(redirect));
        };
    };

    return {
      'passport': passport,
      'strategy': 'saml',
      'generateServiceProviderMetadata': strategy.generateServiceProviderMetadata.bind(strategy)
    };
};
