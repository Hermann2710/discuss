import Message from "../models/message.model.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    console.log(req.user);
    const senderId = req.user._id;

    const send = await Message.sendMessage({ message, receiverId, senderId });
    res.status(201).json({ newMessage: send });
  } catch (error) {
    console.log("Error in message controller", error);
    res.status(400).json({ error: error.message });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    
    const messages = await Message.getMessages({ userToChatId, senderId });
    res.status(200).json({ messages: messages });
  } catch (error) {
    console.log("Error in message controller", error);
    res.status(400).json({ error: error.message });
  }
};
