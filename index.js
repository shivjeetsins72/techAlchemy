const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models/mysql")
const middleware = require("./middleware")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "shivjeet-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

db.sequelize.sync();

// simple route
app.get("/", [middleware.validateJwt.verifyToken],(req, res) => {
  res.json({ message: "Welcome to shivjeet's weather application." });
});

require('./routes/userRoutes')(app);
require('./routes/newsRoutes')(app);
require('./routes/weatherRoutes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})