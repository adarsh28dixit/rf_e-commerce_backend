const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({
        _id : user._id,
        name: user.name,
        email: user.email
        
    },
    process.env.JWT_SECRET || "DIXIT",
    {
        expiresIn: "30d",
    }
    );
}

 const isAuthenticated = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET || "DIXIT", (err, decode) => {
            if(err){
                res.status(400).send({msg: "invalid token"})
            } else{
                req.user = decode;
                next();
            }
        })
    } else{
        res.status(400).send({msg: "no token"})
    }
}


module.exports = {generateToken, isAuthenticated };