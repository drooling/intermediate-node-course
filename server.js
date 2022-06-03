const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require("./models/User");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/userData')

app.listen(80, () => {
	console.log("Server listening -> ( http://localhost:80/ )")
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
	bcrypt.hash(req.body.newUser.password, 10, (err, hash) => {
		if (err) {
			res.json({
				success: false,
				message: err
			})
		} else {
			User.create({ ...req.body.newUser, password: hash }, (err, data) => { buildResponse(res, err, data) })
		}
	});
})

app.post("/login", (req, res) => {
	User.findOne({ email: req.body.email }, (err, data) => {
		if (err) {
			res.send("<center><p>Something went wrong, oops !</p></center>")
		} else if (!data) {
			res.send("<center><p>That account doesn't exist</p></center>")
		} else {
			bcrypt.compare(req.body.password, data.password, (err, match) => {
				if (err) {
					res.send("<center><p>Something went wrong, oops !</p></center>")
				} else {
					if (match) {
						res.send(`<center><p>Welcome ${data.name} !</p></center>`)
					} else {
						res.send("<center><p>Invalid credentials</p></center>")
					}
				}
			});
		}
	})
})

app.route('/users/:id')

	.get((req, res) => {
		User.findById(req.params.id, (err, data) => { buildResponse(res, err, data) })
	})

	.put((req, res) => {
		bcrypt.hash(req.body.updated.password, 10, (err, hash) => {
			if (err) {
				res.json({
					success: false,
					message: err
				})
			} else {
				User.findByIdAndUpdate(req.params.id, { ...req.body.update, password: hash }, { new: true }, (err, data) => { buildResponse(res, err, data) })
			}
		});
	})

	.delete((req, res) => {
		User.findByIdAndDelete(req.params.id, (err, data) => { buildResponse(res, err, data) })
	})