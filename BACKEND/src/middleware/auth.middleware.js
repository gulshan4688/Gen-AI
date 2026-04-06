const jwt = require("jsonwebtoken");
const tokenBlackListModel = require('../models/blacklist.model');
const BlackListTokenModel = require("../models/blacklist.model");


async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "token not provided" })
    }

    const isTokenBlacklisted = await BlackListTokenModel.findOne({token});
    if(isTokenBlacklisted){
        return res.status(401).json({ message : "token is Invalid-BL" })
    }

    try {
        // all the data that is inside token is stored in decoded
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // and we store decoded in req.user 
        req.user = decoded;
        // no controller will handle it further with req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: `Invalid token ${error.message}` })
    }
}

module.exports = {authUser};