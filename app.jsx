require("./public/css/main.css");

var React = require('react');
var ShengJi = require('./components/ShengJi.react.js');

React.renderComponent(
	<ShengJi cards={[]}/>,
	document.getElementById("shengji-canvas")
);