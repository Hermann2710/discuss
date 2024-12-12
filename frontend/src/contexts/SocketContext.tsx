import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

type SocketState = {
  socket: Socket | null;
  onlineUsers: any[] | null;
};

export const SocketContext = createContext({} as SocketState);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export default function SocketContextProvider(props: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://discuss-b4j7.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider
      value={{
        socket: socket,
        onlineUsers: onlineUsers,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}
