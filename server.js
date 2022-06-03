const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/User");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/userData')

app.listen(80, () => {
	console.log("Server listening -> ( http://locahost:80/ )")
})

app.post('/users', (req, res) => {
	// User.create()
})

app.route('/users/:id')

.get((req, res) => {
	// User.findById()
})

.put((req, res) => {
	// User.findByIdAndUpdate()
})

.delete((req, res) => {
	// User.findByIdAndDelete()
})