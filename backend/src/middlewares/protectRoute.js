import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    } else {
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ error: "Unauthorized - User not found" });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Request not authorized" });
  }
};

export default protectRoute;
