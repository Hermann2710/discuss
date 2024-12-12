import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res, next) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json({users: allUsers});
    } catch (error) {
        console.log('Error in user controller', error);
        res.status(500).json({ error: error.message });
    }
}