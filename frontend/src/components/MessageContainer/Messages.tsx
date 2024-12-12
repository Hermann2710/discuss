import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

export default function Messages() {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        [...Array(5)].map((_, index) => <MessageSkeleton key={index} />)
      ) : messages.length === 0 ? (
        <p className="text-center">Send a message to start the conversation</p>
      ) : (
        messages.map((message) => (
          <div ref={lastMessageRef} key={message._id}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
}
