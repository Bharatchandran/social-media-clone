const User = require('../models/user')

module.exports = {
    index
}

async function index (req, res) {
    const users = await User.find({})
    res.render('explore/index', {
        users
    })
}