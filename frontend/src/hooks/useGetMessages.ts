import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import { toast } from "react-toastify";
import Message from "../types/Message";

export default function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/messages/${selectedConversation?._id}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error as string);
        setMessages(data.messages as Message[]);
      } catch (error: any) {
        toast.error(error.messages);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
}
