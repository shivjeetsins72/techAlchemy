//Tests for all the endpoints in this application using chai, mocha and chai-http
const chai = require("chai");
const chaiHttp = require("chai-http");
var server = require("../index");
const should = chai.should();

chai.use(chaiHttp);
//Unauthenticated api test (/api/weather)
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

//Authenticated api test.
describe("User API", function() {

	it("should signup user, signin user, check token, get news and signout user", function(done) {
		var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
		var randomEmail= chars[Math.floor(Math.random()*26)] //Random email generator
                  + Math.random().toString(36).substring(2,11) 
                  + '@gmail.com';
		//endpoint /api/auth/signup api test
		chai.request(server)
			.post("/api/auth/signup")
			.send({
				"name": "TechAlchemy",
				"email": randomEmail,
				"password": "tester"
			}

			).end((err, res) => {
				res.should.have.status(200);
				//endpoint /api/auth/signin api test
				chai.request(server);
				var agent = chai.request.agent(server);
				agent
					.post("/api/auth/signin")
					.send({
						"email": randomEmail,
						"password": "tester"
					})
					.then((res) => {
						res.body.should.have.property("bearerToken");
						return agent.get("/api/news").query({country: "us"}) //endpoint /api/news api test. Bearer token is stored in cookie session
							.then(function(response) {
								response.should.have.status(200);
								response.body.should.have.property("count");
								response.body.should.have.property("data");
								response.body.data.should.be.a("array");
								agent
									.post("/api/auth/signout") // endpoint /api/auth/signout api test.
									.send({
										"email": randomEmail,
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

