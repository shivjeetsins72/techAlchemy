formatNewsResult = (articles) => {
    let result = []
    articles.forEach((element) =>{
        result.push({
            headline: element.title,
            link: element.url
        })
    })
    return result
}
const newsViews = {
    formatNewsResult
  };
module.exports = newsViews;