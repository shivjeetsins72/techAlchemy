formatWeatherData = (weatherData) => {
  let result = []
  weatherData = weatherData.slice(0,5)
  weatherData.forEach((element) =>{
      var date = new Date(element.dt*1000)
      result.push({
          date: date.toDateString(),
          main: element.weather[0].main,
          temp: element.temp.day
      })
  })
  return result
}

const weatherViews = {
  formatWeatherData
  };
module.exports = weatherViews;