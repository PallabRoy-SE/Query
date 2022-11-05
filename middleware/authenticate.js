const jwtDecode = require("jwt-decode");

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.currentuser;
        const userData = jwtDecode(token);

        req.token = token;
        req.rootUser = userData;
        next();
    } catch (err) {
        return res.status(425).json({ error: "Unauthrised! Please login first." });
    }
}

module.exports = Authenticate;













// const jwt = require('jsonwebtoken');
// const User = require('../model/userSchema');

// const Authenticate = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwtoken;
//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

//         const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

//         if (!rootUser) { throw new Error('User not found!') };

//         req.token = token;
//         req.rootUser = rootUser;
//         req.userId = rootUser._id;

//         next();
//     } catch (error) {
//         res.status(400).send('Unauthorized: No token provide');
//         console.log(error);
//     }
// }

// module.exports = Authenticate;