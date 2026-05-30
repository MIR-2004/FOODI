import jwt from 'jsonwebtoken';
import Users from '../Models/Users.js';

const verifyAdmin = async(req, res, next) => {
    const email = req.decoded.email;
    const query = {email: email};

    const user = await Users.findOne(query);
    const isAdmin = user?.role === "admin";

    if(!isAdmin){
        return res.status(403).send({message: "forbidden access"})
    }

    next();
};

export default verifyAdmin;