import { createServer } from "node:http";
import { Server, Socket } from "socket.io";

import { verifyIdToken } from "../middleware/auth";
const server = createServer();

export let socket: Server;
export const socketClients: Record<string, Socket[]> = {};

try {
    server.listen(3333, () => {
        socket = new Server(server, {
            cors: {
                origin: "*"
            }
        });

        socket.on("connection", async socket => {
            const user = await verifyIdToken(socket.handshake.auth.token);
            if (!user) return;

            const sockets = socketClients[user.uid] || [];
            socketClients[user.uid] = [...sockets, socket];
        });
    });
} catch (err) {
    const error = err as Error;
    console.error(error.message);
}
