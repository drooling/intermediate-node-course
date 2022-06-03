const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require("./models/User");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/userData')

app.listen(80, () => {
	console.log("Server listening -> ( http://locahost:80/ )")
})

function buildResponse(res, err, data) {
	if (err) {
		res.json({
			success: false,
			message: err
		})
	} else if (!data) {
		res.json({
			success: false,
			message: "Not Found"
		})
	} else {
		res.json({
			success: true,
			data: data
		})
	}
}

app.post('/users', (req, res) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.newUser.password, salt, (err, hash) => {
			User.create({ ...res.body.newUser, password: (hash + ':' + salt) }, (err, data) => { buildResponse(res, err, data) })
		});
	});
})


app.route('/users/:id')

	.get((req, res) => {
		User.findById(req.params.id, (err, data) => { buildResponse(res, err, data) })
	})

	.put((req, res) => {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.updated.password, salt, (err, hash) => {
				User.findByIdAndUpdate(req.params.id, { ...req.body.update, password: (hash + ':' + salt)}, { new: true }, (err, data) => { buildResponse(res, err, data) })
			});
		});
	})

	.delete((req, res) => {
		User.findByIdAndDelete(req.params.id, (err, data) => { buildResponse(res, err, data) })
	})