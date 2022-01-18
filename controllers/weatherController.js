const util = require("../utils/httpUtil");
const views = require("../views");

//Function to get 5 day weather forcast and send it back to the server
exports.weather = async (req, res) => {
	try {
		const result = await util.getWeatherForcast();
		const weatherData = result.data.daily;
		let  data;
		if(weatherData.length === 0){
			data =weatherData;
		}else {
			data = views.weatherViews.formatWeatherData(weatherData);
		}
		res.status(200).send({
			count: 5,
			unit: "metric",
			location: "Banglore",
			data: data
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
