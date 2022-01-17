const axios = require("axios");
const { request } = require("express");


getNews = async(params) => {
    
    const result = await axios({
        method: "GET",
        url: `https://newsapi.org/v2/top-headlines/`,
        headers: {
        "Content-Type": "application/json"
        },
        params: {
            country: params.country,
            q: params.keyword,
            apikey: "9ccc418864ba412f880d2762b147006b"// API KEY
        },
    });
    return(result)
}

getWeatherForcast = async() => {
    const result = await axios({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall`,
        headers: {
        "Content-Type": "application/json"
        },
        params: {
            exclude: "current,hourly,minutely,alerts",
            lat: "12.9716",
            lon: "77.5946",
            units: "metric",
            appid: "506e4963ab6267a99bce7d229d53048c"// API KEY
        },
    });
    return(result)
}


const httpUtil = {
    getNews,
    getWeatherForcast
  };
  
module.exports = httpUtil;