const db = require("../models/mysql");
const config = require("../config/authConfig");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Function to register new user to the app
exports.signup = async (req, res) => {
	// Save User to Database
	try {
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		});
		res.status(200).send({
			status:200,
			error: false,
			message: "User created successfully"});
	} catch (error) {
		res.status(500).send({
			status: 500,
			error: true,
			errorMessage: error.message
		});
	}
};

//Function to login to the application
exports.signin = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(404).send({
				status: 404,
				error: true,
				message: "User Not found!" });
		}

		const passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				status: 401,
				error: true,
				message: "Invalid Password!",
			});
		}

		const token = jwt.sign({ email: req.body.email }, config.secret, {
			expiresIn: 3600, // 24 hours
		});

		req.session.token = token;

		return res.status(200).send({
			status: 200,
			error: false,
			bearerToken: token
		});
	} catch (error) {
		return res.status(500).send({
			status: 500,
			error: true,
			message: error.message });
	}
};

//Function to signout from the application
exports.signout = async (req, res) => {
	try {
		req.session = null;
		return res.status(200).send({
			status: 200,
			error: false,
			message: "Signed out successfully!"
		});
	} catch (err) {
		this.next(err);
	}
};
