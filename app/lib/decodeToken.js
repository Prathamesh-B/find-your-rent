const jwt = require("jsonwebtoken");

const decodeToken = (authToken) => {
    try {
        const decodedToken = jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);
        return decodedToken;
    } catch (error) {
        console.error("Error verifying JWT:", error.message);
        throw new Error("Invalid token");
    }
};

export default decodeToken;
