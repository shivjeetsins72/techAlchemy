const news = require("../utils/httpUtil");
const views = require("../views");

//Function to provide response back to server for the /api/news endpoint
exports.news = async (req, res) => {
	try {
		if(req.query.country === undefined && req.query.keyword === undefined){
			res.status(404).send({
				status: 404,
				error: true,
				message: "Please enter atleast one query parameter!"
			});
			return;
		}
		const result = await news.getNews(req.query);
		const articles = result.data.articles;
		let count, data;
		if(articles.length === 0){
			count = 0;
			data =articles;
		}else {
			count = articles.length;
			data = views.newsViews.formatNewsResult(articles);
		}
		res.status(200).send({
			count: count,
			data: data,
		});
	} catch (error) {
		res.status(500).send({
			status: 500,
			error: true,
			message: error.message
		});
	}
};
