'use strict';
require("./public/css/main.css");
require("./public/css/style.css");

var React = require('react');
var ShengJi = require('./components/ShengJi.jsx');

React.render(
  <ShengJi cards={[]}/>,
  document.getElementById("shengji-canvas")
);
