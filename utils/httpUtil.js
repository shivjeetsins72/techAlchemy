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


const httpUtil = {
    getNews
  };
  
module.exports = httpUtil;