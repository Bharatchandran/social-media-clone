
const fetch = require('node-fetch')
const token = process.env.NEWS_API;


module.exports ={
    news
}

async function news(req, res){
    let getNews = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${token}`)
    .then(res=> res.json())
    .then()
    getNews = getNews.articles
    res.render('partials/news',
        {
            getNews
        })

}