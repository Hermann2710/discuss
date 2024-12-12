import { SyntheticEvent, useState } from "react";
import { BsSend } from "react-icons/bs";
import Message from "../../types/Message";
import useSendMessage from "../../hooks/useSendMessage";

export default function MessageInput() {
  const [message, setMessage] = useState<Message>({
    message: "",
  });
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async function (e: SyntheticEvent) {
    e.preventDefault();
    if (!message.message) return;
    await sendMessage(message);
    setMessage({ ...message, message: "" });
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message"
          value={message.message!}
          onChange={(e) => setMessage({ ...message, message: e.target.value })}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute inset-y-0 end-0 flex items-center px-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
}
