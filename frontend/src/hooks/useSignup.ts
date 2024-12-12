import { useState } from "react";
import User from "../types/User";
import { toast } from "react-toastify";
import { useAuthContext } from "../contexts/AuthContext";

function handleInputErrors(data: User) {
  if (
    !data.fullName ||
    !data.username ||
    !data.password ||
    !data.confirmPassword ||
    !data.gender
  ) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (data.password !== data.confirmPassword) {
    toast.error("The passwords must match");
    return false;
  }

  if (data.password.length < 8) {
    toast.error("The password must be at least 8 characters");
    return false;
  }

  return true;
}

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (data: User) => {
    const success = handleInputErrors(data);

    if (!success) return;

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error as string);
      } else {
        // SET TO LOCALSTORAGE
        localStorage.setItem('chat-user', JSON.stringify(json.user));
        // CONTEXT
        setAuthUser(json.user);
      }
    } catch (error: any) {
      toast.error(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
}
