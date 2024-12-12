import { Schema, model } from "mongoose";
import Conversation from "./conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

messageSchema.statics.sendMessage = async function (data) {
  try {
    const { message, receiverId, senderId } = data;
    if (!message) {
      throw new Error("Message must be provided");
    }
    if (!receiverId) {
      throw new Error("Receiver must be provided");
    }
    if (!senderId) {
      throw new Error("Request not authorized");
    }

    const conversation = await Conversation.searchConversation({
      senderId,
      receiverId,
    });
    if (conversation) {
      const created = await this.create({
        senderId: senderId,
        receiverId: receiverId,
        message: message,
      });
      if (created) {
        await Conversation.addMessage({
          _id: conversation._id,
          message: created,
        });

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
          // io.to(<socket_id>).emit() used to send events to specific client
          io.to(receiverSocketId).emit("newMessage", created);
        }

        return created;
      }
    } else {
      throw new Error("Error when searching the conversation");
    }
  } catch (error) {
    console.log("Error in message model", error);
    throw new Error(error.message);
  }
};

messageSchema.statics.getMessages = async function (data) {
  try {
    const { userToChatId: receiverId, senderId } = data;

    const conversation = await Conversation.searchConversation({
      senderId,
      receiverId,
    });
    const messages = await conversation.populate("messages");
    return messages.messages;
  } catch (error) {
    console.log("Error in message model", error);
    throw new Error(error.message);
  }
};

const Message = model("Message", messageSchema);

export default Message;
