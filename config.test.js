const config = require("./config");
const fs = require("fs");

jest.mock("fs");

it("provides standard Shib SP configuration defaults", () => {
  expect(config({ host: "localhost" })).toEqual(
    expect.objectContaining({
      entryPoint: "https://sso.brown.edu/idp/profile/SAML2/Redirect/SSO",
      cert:
        "MIIDHzCCAgegAwIBAgIUHPSdb4ae0QA3fyeEIe7wKXi2oT0wDQYJKoZIhvcNAQEFBQAwGDEWMBQGA1UEAxMNc3NvLmJyb3duLmVkdTAeFw0xMDA1MjEyMTAyMzFaFw0zMDA1MjEyMTAyMzFaMBgxFjAUBgNVBAMTDXNzby5icm93bi5lZHUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCxabgPhLgyIOyoG87T41EXwUOyXKNJ4XvFa5moC3y8J9JzWBeVRQ8L7zxEiLcsZ4qHYdOCVZNSD5SYeI8rtjwz/lHlJsF7dfLXpeQSm5HggcgWEEbvgp+qHRsbu6ZLKUmD0qLnWLZ5pG+ihm0n10G6h9op9NKJqJOgkyk3PQbe1biAjjpnkVL5CxL4h1E0XADZogZBh3pY04kNzbMvaWsB9ToDI8i6JqTfyEZZcQr4ShgIdstAHzbHcGoRqSOuI3BDeYDj0lp7/X/v/lvQMWWnKFJD6E7xKypoVO2czCswZ9i390YkI9+eoBbIMunuE/JjPZwwknnWqaI5LBDkGbnJAgMBAAGjYTBfMD4GA1UdEQQ3MDWCDXNzby5icm93bi5lZHWGJGh0dHBzOi8vc3NvLmJyb3duLmVkdS9pZHAvc2hpYmJvbGV0aDAdBgNVHQ4EFgQU1EgYrxblcWF0RP8BxGEPTM4SkIowDQYJKoZIhvcNAQEFBQADggEBAG1o9TLKHLDMlW+fRtyWXeGI1Dpnvw505nmWOQEPzXnT3oMRsmFYUrynl6amaay0IlEZ86g8KALM0AsKA9x2hYz/Kvs99ZLJJ+3mcHDswWWC9NYme6HEzs+mXRXD2wxOWUYNKc2xAs3QPOpYmX2g6sZiDPkyQ4KOZT/Vh9BZ970k7vtJ0lIOUFSDTQnlfGOtdEBE6QehIzHF6SpFakYYFyAK1MO4G/vdYYoe4lF5FTUg9UjnEWqwcmCX02ay5ma5YMkNkyXeetU6HmLRBnpwPcuCgIkzuXP64h+6nVWpbLEJHeHIom+fbTMoCnUDbZ0FcmiGxk9Cg6RPORcGztgLcVw=",
      identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
      disableRequestedAuthnContext: true,
      acceptedClockSkewMs: 180000
    })
  );
});

it("provides a default issuer based on given host", () => {
  expect(config({ host: "https://local.cis-dev.brown.edu:8443" })).toEqual(
    expect.objectContaining({
      issuer: "https://local.cis-dev.brown.edu/shibboleth-sp"
    })
  );
});

it("provides a default callback url based on given host", () => {
  expect(config({ host: "https://local.cis-dev.brown.edu:8443" })).toEqual(
    expect.objectContaining({
      callbackUrl: "https://local.cis-dev.brown.edu:8443/login/callback"
    })
  );
});

it("returns the private key file contents if a path is provided", () => {
  fs.readFileSync.mockReturnValue("mock private key");
  const c = config({ host: "localhost", privateKeyPath: "./privatekey.pem" });
  expect(fs.readFileSync).toHaveBeenCalledWith("./privatekey.pem");
  expect(c.decryptionPvk).toBe("mock private key");
});

it("throws an error if host is not provided", () => {
  expect(() => config({})).toThrow();
});
