const chai = require("chai");
const chaiHttp = require("chai-http");

const describe = chai.describe;
const it = chai.it();
var server = require("../index");

chai.use(chaiHttp);
describe("Weather API", function() {

	it("should list 5 days weather forcast", function(done) {
		chai.request(server)
			.get("/api/weather")
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a("object");
				res.body.should.have.property("count");
				res.body.should.have.property("unit");
				res.body.should.have.property("location");
				res.body.should.have.property("data");
				res.body["data"].should.be.a("array");
				done();
			});
	});
});

describe("User API", function() {

	it("should signup user, signin user, check token and signout user", function(done) {
		chai.request(server)
			.post("/api/auth/signup")
			.send({
				"name": "Paul Oluyege",
				"email": "tester20@gmail.com",
				"password": "tester"
			}

			).end((err, res) => {
				res.should.have.status(200);
				chai.request(server);
				var agent = chai.request.agent(server);
				agent
					.post("/api/auth/signin")
					.send({
						"email": "tester20@gmail.com",
						"password": "tester"
					})
					.then((res) => {
						res.body.should.have.property("bearerToken");
						return agent.get("/api/news").query({country: "us"})
							.then(function(response) {
								response.should.have.status(200);
								response.body.should.have.property("count");
								response.body.should.have.property("data");
								response.body.data.should.be.a("array");
								agent
									.post("/api/auth/signout")
									.send({
										"email": "tester20@gmail.com",
										"password": "tester"
									})
									.then((res) => {
										res.should.have.status(200);
										agent.close();
										done();
									});
							});

					});
			});
	});
});

