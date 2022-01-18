const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");

const verifyToken = (req, res, next) => {
	const token = req.session.token;

	if (!token) {
		return res.status(403).send({
			status: 403,
			error: true,
			message: "Authentication error. Token unavailable!",
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				status: 401,
				error: true,
				message: "Bearer token expired!",
			});
		}
		req.email = decoded.email;
		next();
	});
};

const authJwt = {
	verifyToken
};
module.exports = authJwt;
