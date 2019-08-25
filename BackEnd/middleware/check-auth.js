const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            var decodedToken = jwt.verify(token, "jsonWebTokens", function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.userData = {
                        email: decoded.email,
                        userId: decoded.userId,
                        username: decoded.username,
                        // role: decoded.role,
                        // type: decoded.type,
                        profileImage: decoded.profileImage
                    }
                    next();
                }
            });
        }
    } catch (error) {
        res.status(401).json({message: "You are not authenticated!"});
    }
};
