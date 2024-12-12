import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import useConversation from "../store/useConversation";
import Message from "../types/Message";

import notification from "../assets/sounds/notification.mp3";

export default function useListenMessages() {
  const { socket } = useSocketContext();
  const { setMessage } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      setMessage(newMessage);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessage]);
}
