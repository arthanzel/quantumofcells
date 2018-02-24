# csi3540-project
Term project for CSI3540

[![Build Status](https://travis-ci.org/arthanzel/csi3540-project.svg?branch=master)](https://travis-ci.org/arthanzel/csi3540-project)

## What is Quantum of Cells?

Quantum of Cells, or QoC, is a nifty differential equation solver. You plug your equations in a box, click a button, and QoC will evaluate them and print out a graph of the solution.

Why would you ever want to make differential equations? Perhaps you're a physics student who's studying the swinging motion of a pendulum. Or maybe you're a biologist and you need to see how a substrate enters a cell. Both of these problems can be described using differential equations. You simply plug them in to QoC and it'll do all the hard work for you.

The neatest thing about QoC is that it lets you rapidly prototype *dynamical systems*, or sets of differential equations that interact with each other. These kinds of systems can be notoriously unpredictable and difficult to study. Normally, scientists, engineers, and other nerds make these systems in specialized software like Matlab, which can be pretty expensive and time-consuming. Quantum of Cells works right in your browser, and you can tweak the equations and see results right away. No more expensive Matlab licenses!

*Note for smart people:* Quantum of Cells is limited to non-stiff, initial value problems. The differential equations must be first-order, but the system itself needn't necessarily be first-order.

## Features

Here's a list of features that (supposedly) will be complete soon:

- Write systems of differential equations and solve them using a variety of integration methods
- Create an account and save projects to play with later
- Study a handful of sample projects on physics, chemistry, ecology, population dynamics, and genetic engineering.

Here's a list of features that might be implemented at some point. Maybe.

- Rendering parametric plots of two variables

## Technology

Quantum of Cells runs separate client and server applications. They communicate through a REST API.

### Client

- Single-page React app
- ES6 + Babel + Webpack
- Hosted on Github Pages

### Server

- Grails or Node.js (to be decided)
- Hosted on Heroku free tier
- MongoDB databased hosted by mLab free tier

## Building

See client/README.md and server/README.md for building instructions

# Notes

## Numerical Integration Methods

- Euler (done)
- Midpoint and trapezoid
- Simpson with 2 or 3 different precisions
- RK

https://en.wikipedia.org/wiki/Stiff_equation
https://en.wikipedia.org/wiki/Linear_multistep_method
https://en.wikipedia.org/wiki/Trapezoidal_rule_(differential_equations)
https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods