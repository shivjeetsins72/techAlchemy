const db = require("../models/mysql");
const User = db.user;

//checkDuplicateEmail validates the email against the emails present in database
const checkDuplicateEmail = async (req, res, next) => {
	try {
		// Email
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
			errorMessage: "Unable to validate Username!"
		});
	}
};
const verifySignUp = {
	checkDuplicateEmail,
};

module.exports = verifySignUp;
