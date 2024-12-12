import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

conversationSchema.statics.searchConversation = async function (data) {
  try {
    const { receiverId, senderId } = data;
    if (!receiverId) {
      throw new Error("Receiver is required");
    }
    if (!senderId) {
      throw new Error("Request not authorized");
    }

    let conversation = await this.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await this.create({
        participants: [senderId, receiverId],
      });
    }

    return conversation;
  } catch (error) {
    throw new Error(error.message);
  }
};

conversationSchema.statics.addMessage = async function (data) {
  try {
    const { _id, message } = data;
    if (!_id) {
      throw new Error("Please select a conversation");
    }
    if (!message) {
      throw new Error("Please send a message");
    }

    const conversation = await this.findById(_id);
    if (!conversation) {
      throw new Error("Please select a conversation");
    } else {
      conversation.messages.push(message);

      await conversation.save();
      return conversation;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const Conversation = model("Conversation", conversationSchema);

export default Conversation;
