# Quantum of Cells
[![Build Status](https://travis-ci.org/arthanzel/csi3540-project.svg?branch=master)](https://travis-ci.org/arthanzel/csi3540-project)

Quantum of Cells (QoC) is a nifty differential equation solver. You type your equations in a box, click a button, and QoC will evaluate them and display a graph of the solution. It's very handy for prototyping and troubleshooting dynamical systems without the hassle of buying and learning Matlab.

QoC was originally written to allow [iGEM](http://igem.org) teams to create and test genetic networks. However, it can solve many other non-stiff, higher-order, initial-value problems as well.

## Building
This app contains a `client` module and a `server` module.

Building the client:

    cd client
    npm install
    npm start
    
Building the server:

    cd server
    npm install
    npm start
    
Point your browser to `http://lvh.me:8080`.

**Note:** `lvh.me` (**L**ocal **V**irtual **H**ost) is a domain that resolves to `127.0.0.1`. This is necessary to avoid issues with Auth0 and CORS. You can edit your `hosts` file to point `lvh.me` to `127.0.0.1` and avoid the DNS lookup.
    
### Database
Quantum of Cells uses [MongoDB](https://www.mongodb.com/). You can use either a local instance, or connect to a service such as [mLab](https://mlab.com/).

If you have Docker, get a database up and running quickly with:

    docker run -d -p 127.0.0.1:27017:27017 --name qoc-mongo mongo
    
If you want to use your own database, or if you want to use a service like mLab, paste the following in `client/config/local.json`:

    {
        "db": {
            "host": "my.database.host.com",
            "port": 27017,
            "name": "my-database-name",
            "user": "myUser",
            "password": "myPassword"
        }
    }
    
You can override any of the database parameters with the following environment variables: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`. Environment variables take precedence over any config.

**Note**: Some services (like mLab) use uncommon ports, which are blocked on some organizations' networks (like uOttawa's). Therefore, you'll need to use a VPN if you want to use uncommon ports.

### Internet Connection Required
Quantum of Cells depends on external APIs, so an internet connection is required when developing.

## Technology
Quantum of Cells consists of a client, which is a React single-page application (SPA), and a Node.js API server. They communicate through a REST API.

**Client:**
- React/Redux SPA
- ES6 + Babel + Webpack
- Stylus
- [Auth0](https://auth0.com/)
- Hosted on Github Pages
- Accessible at `https://quantumofcells.com`

**Server:**
- Node.js + ES6 + Babel
- Hosted on Heroku free tier
- MongoDB database hosted by mLab free tier

## Roadmap
List of future features:

- Solving systems using a variety of integration methods (currently, only the Euler method is available)
- Comprehensive and documented sample projects on physics, chemistry, ecology, population dynamics, and genetic engineering
- Rendering of two-variable parametric plots