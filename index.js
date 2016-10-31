var passport = require('passport'),
    samlStrategy = require('passport-saml').Strategy,
    config = require('./config');

module.exports = function (host, cbPath, issuer, attributeMap) {
    if (typeof issuer === 'object' && issuer !== null) {
        attributeMap = issuer;
        issuer = null;
    }
    var defaultAttributes = {
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
    };
    if (attributeMap !== false) {
        attributeMap = attributeMap || defaultAttributes;
    }

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new samlStrategy(config(host, cbPath, issuer),
        function (profile, done) {
            var prof = {};
            if (attributeMap) {
                for (var a in attributeMap) {
                    if (a in profile) {
                        profile[attributeMap[a]] = prof[attributeMap[a]] = profile[a];
                        delete profile[a];
                    }
                }
            } else {
                prof = profile;
            }
            return done(null, prof);
        })
    );
    passport.logout = function (strategy, options) {
        options = options || {};

        return function (req, res) {
            if (!options.successRedirect) {
                options.successRedirect = host + '/';
            }

            req.logout();
            return res.redirect('https://sso.brown.edu/idp/shib_logout.jsp?return=' + encodeURI(options.successRedirect));
        };
    };
    return {'passport': passport, 'strategy': 'saml'};
};
