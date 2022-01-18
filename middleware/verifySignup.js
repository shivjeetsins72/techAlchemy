const db = require("../models/mysql");
const User = db.user;

//checkDuplicateEmail validates the email against the emails present in database
const checkDuplicateEmail = async (req, res, next) => {
	try {
		// Email
		if(req.body.name === undefined || req.body.name === ""){
			return res.status(400).send({
				status: 400,
				error: true,
				errorMessage: "Failed! Name is missing!"
			});
		}
		if(req.body.email === undefined || req.body.email === ""){
			return res.status(400).send({
				status: 400,
				error: true,
				errorMessage: "Failed! Email is missing!"
			});
		}
		if(req.body.password === undefined || req.body.password === ""){
			return res.status(400).send({
				status: 400,
				error: true,
				errorMessage: "Failed! Password is missing!"
			});
		}
		const user = await User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (user) {
			return res.status(400).send({
				status: 400,
				error: true,
				errorMessage: "Failed! Email is already in use!"
			});
		}

		next();
	} catch (error) {
		return res.status(500).send({
			status: 500,
			error: true,
			errorMessage: "Unable to create user!"
		});
	}
};
const verifySignUp = {
	checkDuplicateEmail,
};

module.exports = verifySignUp;
