import { create } from "zustand";
import User from "../types/User";
import Message from "../types/Message";

type ConversationState = {
  selectedConversation: User | null;
  setSelectedConversation: (conversation: User | null) => void;
  messages: Message[];
  setMessage: (message: Message) => void;
  setMessages: (message: Message[]) => void;
};

const useConversation = create<ConversationState>()((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectTedConversation: User | null) =>
    set((prev) => ({
      ...prev,
      selectedConversation: selectTedConversation,
    })),
  messages: [],
  setMessage: (message: Message) =>
    set((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    })),
    setMessages: (messages: Message[]) =>
      set((prev) => ({
        ...prev,
        messages: messages,
      })),
}));

export default useConversation;
