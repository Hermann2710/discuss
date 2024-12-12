import { useSocketContext } from "../../contexts/SocketContext";
import useConversation from "../../store/useConversation";
import User from "../../types/User";

type Props = {
  conversation: User;
  lastIdx: boolean;
};

export default function Conversation(props: Props) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === props.conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers?.includes(props.conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected && "bg-sky-500"
        }`}
        onClick={() => setSelectedConversation(props.conversation)}
      >
        <div className={`avatar ${isOnline && "online"}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                props.conversation.profilePic
                  ? props.conversation.profilePic
                  : "/vite.svg"
              }
              alt={props.conversation.username}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {props.conversation.fullName}
            </p>
            <span className="text-xl">😊</span>
          </div>
        </div>
      </div>

      {!props.lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}
