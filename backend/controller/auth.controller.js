const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const login = asyncHandler(async (req,res) => {
    //Authenticate User
    const username = req.body.username;
    const user = { name: username};

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken});
})

const logout = asyncHandler(async (req,res) => {

})

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    //verify token
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403); //token expired or no longer valid
        req.user = user;
        next();
    });
}

module.exports = {
    login,
    logout,
    authenticateToken
}