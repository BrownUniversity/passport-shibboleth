# Brown Shib Example

## Setup

In the `brown-shib` root directory, run:

```
  npm install
  sudo npm link
```

In this directory, run:

```
  npm install
  sudo npm link brown-shib
  openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

If for some reason you run `npm install` again, you'll need to rerun `sudo npm link brown-shib`.

## Usage

Run `npm start` and open [localhost:8443/](https://localhost:8443/).
