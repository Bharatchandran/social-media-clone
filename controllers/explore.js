const User = require('../models/user')

module.exports = {
    index,
    find: findPeople
}

async function index (req, res) {
    const users = await User.find({});
    const formPath = "/explore/find"; //gives the path for the form action in search bar.ejs
    res.render('explore/index', {
        title: "Search",
        users,
        formPath
    })
}

async function findPeople(req, res) {
    const users = await User.find({name: req.query.name});
    const formPath = "/explore/find"; //gives the path for the form action in search bar.ejs
    res.render('explore/index', {
        users,
        title: "Search",
        formPath
    })
}