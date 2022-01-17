const middleware = require("../middleware")
const controller = require("../controllers/weatherController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/weather",
    controller.weather
  );
};