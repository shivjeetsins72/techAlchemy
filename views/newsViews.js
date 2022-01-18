const formatNewsResult = (articles) => {
	const result = [];
	articles.forEach((element) =>{
		result.push({
			headline: element.title,
			link: element.url
		});
	});
	return result;
};
const newsViews = {
	formatNewsResult
};
module.exports = newsViews;
