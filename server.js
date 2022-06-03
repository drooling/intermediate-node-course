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
	User.create({
		name: req.body.newUser.name,
		email: req.body.newUser.email,
		password: req.body.newUser.password
	}, (err, data) => {
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
	})
})


app.route('/users/:id')

	.get((req, res) => {
		User.findById(req.params.id, (err, data) => {
			if (err) {
				res.json({
					success: false,
					message: err
				})
			} else if (!data) {
				res.json({
					success: false,
					message: "Not found"
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	})

	.put((req, res) => {
		User.findByIdAndUpdate(req.params.id, {
			name: req.body.updated.name,
			email: req.body.updated.email,
			password: req.body.updated.password
		}, { new: true }, (err, data) => {
			if (err) {
				res.json({
					success: false,
					message: err
				})
			} else if (!data) {
				res.json({
					success: false,
					message: "Not found"
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	})

	.delete((req, res) => {
		User.findByIdAndDelete(req.params.id, (err, data) => {
			if (err) {
				res.json({
					success: false,
					message: err
				})
			} else if (!data) {
				res.json({
					success: false,
					message: "Not found"
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	})