const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
    try {
        let tmp = req.header("Authorization");
        // console.log("Authorization header:", tmp); // Debugging line

        // Extract the token from the Authorization header
        const token = tmp ? tmp.slice(7, tmp.length) : "";
        // console.log("Extracted token:", token); // Debugging line

        if (!token) {
            console.log("1 - No token provided"); // Debugging line
            return res.status(400).json({ message: "Invalid Authentication!" });
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'TokenExpiredError: jwt expired' });
                }
                console.log("2 - Token verification failed", err); // Debugging line
                return res.status(400).json({ message: err });
            }
            // console.log("3 - Token verified, user:", user); // Debugging line
            
            // Attach the user information to the request object
            req.user = user;
            next();
        });
    } catch (error) {
        console.log("4 - Middleware error", error); // Debugging line
        return res.status(500).json({ message: error.message });
    }
}