const util = require("../utils/httpUtil")
const views = require("../views")
exports.weather = async (req, res) => {
  // Save User to Database
  try {
    let result = await util.getWeatherForcast()
    let weatherData = result.data.daily
    let  data
    if(weatherData.length === 0){
        data =weatherData
    }else {
        data = views.weatherViews.formatWeatherData(weatherData)
    }
    res.status(200).send({
      count: 5,
      unit: "metric",
      location: "Banglore",
      data: data
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};