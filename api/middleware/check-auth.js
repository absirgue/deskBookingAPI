/**
 * Check token given when sensitive API calls are done in order to check for user authentication to access certain infos
 * Note that security still needs to be improved as a token is valid for quite a long time and any user is able to access any info on the app (needs to create a second check-auth for company users and probably protect personal info abt a specific user so that it is only accessible to thsi specific user)
 * 
 * Author: asirgue
 * Version: 4.0
 */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "Roquefort-sur-Soulzon");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};