import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body = req.body || {};
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: error });
    }
}

export default authUser;