// Http/Https requests using axios
const axios = require("axios");

//Function to get news from the https://newsapi.org. Query with country and keyword functionality is available.
const getNews = async(params) => {

	const result = await axios({
		method: "GET",
		url: "https://newsapi.org/v2/top-headlines/",
		headers: {
			"Content-Type": "application/json"
		},
		params: {
			country: params.country,
			q: params.keyword,
			apikey: "9ccc418864ba412f880d2762b147006b"// API KEY
		},
	});
	return(result);
};

//Function to get weather data from OpenWeatherMap
const getWeatherForcast = async() => {
	const result = await axios({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/onecall",
		headers: {
			"Content-Type": "application/json"
		},
		params: {
			exclude: "current,hourly,minutely,alerts", //Hardcoded as per the assignment but can be changed later to dynamic easily
			lat: "12.9716", //Hardcoded as per the assignment but can be changed later to dynamic easily
			lon: "77.5946", //Hardcoded as per the assignment but can be changed later to dynamic easily
			units: "metric", //Hardcoded as per the assignment but can be changed later to dynamic easily
			appid: "506e4963ab6267a99bce7d229d53048c"// API KEY
		},
	});
	return(result);
};


const httpUtil = {
	getNews,
	getWeatherForcast
};

module.exports = httpUtil;
