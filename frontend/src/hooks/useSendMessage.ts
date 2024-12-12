import { useState } from "react";
import useConversation from "../store/useConversation";
import Message from "../types/Message";
import { toast } from "react-toastify";

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { setMessage, selectedConversation } = useConversation();

  const sendMessage = async (data: Message) => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();

      if (json.error) {
        throw new Error(json.error as string);
      } else {
        setMessage(json.newMessage as Message);
      }
    } catch (error: any) {
      toast.error(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}
