import { useState } from "react";
import User from "../types/User";
import { toast } from "react-toastify";
import { useAuthContext } from "../contexts/AuthContext";

function handleInputErrors(data: User) {
  if (!data.username || !data.password) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (data.password.length < 8) {
    toast.error("The password must be at least 8 characters");
    return false;
  }

  return true;
}

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async function (data: User) {
    try {
      setLoading(true);
      const success = handleInputErrors(data);
      if (!success) return;

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error as string);
      } else {
        localStorage.setItem("chat-user", JSON.stringify(json.user));
        setAuthUser(json.user);
      }
    } catch (error: any) {
      toast.error(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}
