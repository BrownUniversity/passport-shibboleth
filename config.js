var path = require('path');
var fs = require('fs');
var assets = path.join(path.dirname(fs.realpathSync(__filename)), './assets');

module.exports = function (host, cbPath, issuer) {
    var idx = host.lastIndexOf(':'), port = '', config;
    host = host.replace(/\/*$/, '');
    if (idx > -1) {
        port = host.substr(idx);
        host = host.substr(0, idx);
    }
    cbURL = host + port + (cbPath || '/login/callback').replace(/^\/*/, '/');
    issuer = issuer || host + '/shibboleth-sp';
    config = {
        'callbackUrl': cbURL,
        'entryPoint': 'https://sso.brown.edu/idp/profile/SAML2/Redirect/SSO',
        'issuer': issuer,
        'cert': 'MIIDHzCCAgegAwIBAgIUHPSdb4ae0QA3fyeEIe7wKXi2oT0wDQYJKoZIhvcNAQEFBQAwGDEWMBQGA1UEAxMNc3NvLmJyb3duLmVkdTAeFw0xMDA1MjEyMTAyMzFaFw0zMDA1MjEyMTAyMzFaMBgxFjAUBgNVBAMTDXNzby5icm93bi5lZHUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCxabgPhLgyIOyoG87T41EXwUOyXKNJ4XvFa5moC3y8J9JzWBeVRQ8L7zxEiLcsZ4qHYdOCVZNSD5SYeI8rtjwz/lHlJsF7dfLXpeQSm5HggcgWEEbvgp+qHRsbu6ZLKUmD0qLnWLZ5pG+ihm0n10G6h9op9NKJqJOgkyk3PQbe1biAjjpnkVL5CxL4h1E0XADZogZBh3pY04kNzbMvaWsB9ToDI8i6JqTfyEZZcQr4ShgIdstAHzbHcGoRqSOuI3BDeYDj0lp7/X/v/lvQMWWnKFJD6E7xKypoVO2czCswZ9i390YkI9+eoBbIMunuE/JjPZwwknnWqaI5LBDkGbnJAgMBAAGjYTBfMD4GA1UdEQQ3MDWCDXNzby5icm93bi5lZHWGJGh0dHBzOi8vc3NvLmJyb3duLmVkdS9pZHAvc2hpYmJvbGV0aDAdBgNVHQ4EFgQU1EgYrxblcWF0RP8BxGEPTM4SkIowDQYJKoZIhvcNAQEFBQADggEBAG1o9TLKHLDMlW+fRtyWXeGI1Dpnvw505nmWOQEPzXnT3oMRsmFYUrynl6amaay0IlEZ86g8KALM0AsKA9x2hYz/Kvs99ZLJJ+3mcHDswWWC9NYme6HEzs+mXRXD2wxOWUYNKc2xAs3QPOpYmX2g6sZiDPkyQ4KOZT/Vh9BZ970k7vtJ0lIOUFSDTQnlfGOtdEBE6QehIzHF6SpFakYYFyAK1MO4G/vdYYoe4lF5FTUg9UjnEWqwcmCX02ay5ma5YMkNkyXeetU6HmLRBnpwPcuCgIkzuXP64h+6nVWpbLEJHeHIom+fbTMoCnUDbZ0FcmiGxk9Cg6RPORcGztgLcVw=',
        // 'privateCert': fs.readFileSync(assets + '/sp-key.pem'),
        'identifierFormat': 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
        'disableRequestedAuthnContext': true
    };
    return config;
};
