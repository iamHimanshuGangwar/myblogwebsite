import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization || null;
    // const token = jwttoken && jwttoken.startsWith("Bearer") ?
    //     jwttoken.split(" ")[1]
    //     : null;
  
    if (!token || token.split('.').length !==3) {
        return res.status(401).json({ success: false, message: "Unauthorized access" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Jwt error:", error.message);
        res.json({ success: false, message: "Inavlid or expired token" })
    }
}
export default auth