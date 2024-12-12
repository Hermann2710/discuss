import { useAuthContext } from "../../contexts/AuthContext";
import useConversation from "../../store/useConversation";
import * as Mess from "../../types/Message";
import extractTime from "../../utils/extractTime";

type Props = {
  message: Mess.default;
};

export default function Message({ message }: Props) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "chat-bubble-primary" : "";
  
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10-rounded-full">
          <img src={profilePic || "/vite.svg"} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTime(message.createdAt!)}
      </div>
    </div>
  );
}
