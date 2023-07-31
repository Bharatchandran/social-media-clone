
const fetch = require('node-fetch')
const token = process.env.NEWS_API;

// 'https://newsapi.org/v2/everything?' +
// 'q=Apple&' +
// 'from=2023-07-31&' +
// 'sortBy=popularity&' +
// 'apiKey=cf51f1bfc0724bbbbaa137599532fc51';

module.exports ={
    news
}

async function news(req, res){
    // const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${token}`
    // var newsReq = new Request(NEWS_URL);
    // fetch(newsReq)
    // .then(res => {
    //     res.json()
    // })

    let getNews = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${token}`)
    .then(res=> res.json())
.then()
getNews = getNews.articles
    res.render('partials/news',
    {
        getNews
    })

}