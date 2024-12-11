import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.login(data);
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({ user });
  } catch (error) {
    console.log("Error in auth controller", error);
    res.status(400).json({ error: error.message });
  }
};

export const signupUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.register(data);
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({ user });
  } catch (error) {
    console.log("Error in auth controller", error);
    res.status(400).json({ error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in auth controller", error);
    res.status(400).json({ error: error.message });
  }
};
