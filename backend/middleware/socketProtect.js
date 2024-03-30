// const jwt = require('jsonwebtoken');

const verifyToken = (socket , next) => {
    const userId = socket.handshake.auth
    
    console.log("userId: ",userId);
    if (!userId) {
        return next(new Error('Authentication error'));
    }
    socket.user = userId;


    next();
}

module.exports = {
    verifyToken,
}