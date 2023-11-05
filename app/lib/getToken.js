const jwt = require("jsonwebtoken");


const getToken = (authToken) => {
    const k =  jwt.verify(authToken, process.env.NEXT_PUBLIC_JWT_SECRET);
    return k;
}

export default getToken