import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../contexts/AuthContext";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async function () {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      }
    } catch (error: any) {
      toast.error(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
}
