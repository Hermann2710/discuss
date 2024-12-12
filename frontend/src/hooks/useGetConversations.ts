import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import User from "../types/User";

export default function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<User[]>([]);

  useEffect(() => {
    async function getConversations() {
      try {
        setLoading(true);
        const res = await fetch("/api/users");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        } else {
          setConversations(data.users as User[]);
        }
      } catch (error: any) {
        toast.error(error.message as string);
      } finally {
        setLoading(false);
      }
    }

    getConversations();
  }, []);

  return { loading, conversations };
}
