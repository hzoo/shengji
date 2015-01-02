'use strict';
require("./public/css/main.css");

var React = require('react');
var ShengJi = require('./components/ShengJi.jsx');

React.renderComponent(
	<ShengJi cards={[]}/>,
	document.getElementById("shengji-canvas")
);
