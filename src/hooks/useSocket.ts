import { useUser } from "@/contexts/UserContext";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
let socket: Socket;

export const useSocket = () => {
    const { isAuthenticated, user } = useUser();
    const [isConnected, setIsConnected] = useState(false);

    async function connect() {
        if (!socket) await api.get("socket");
        const token = await user?.getIdToken();

        socket = io("http://localhost:3333", {
            auth: {
                token
            }
        });
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => console.log("disconnect"));
    }

    function emit() {
        socket.emit("connect", "renan");
    }
    useEffect(() => {
        if (!isAuthenticated) return;

        connect();
        () => socket?.disconnect();
    }, [isAuthenticated]);

    return {
        isConnected,
        socket,
        emit
    };
};
