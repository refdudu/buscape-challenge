import type { AuthMiddlewareRequest } from "@/api/middleware/auth";
import { socket } from "@/api/utils/socket";
import type { NextApiResponse } from "next";
import type { Server } from "node:http";
import type { Socket } from "node:net";
import type { Server as SocketServer } from "socket.io";

export const config = {
    api: {
        bodyParser: false
    }
};

interface MySocket extends Socket {
    server: Server & {
        io: SocketServer;
    };
}

export interface SocketResponse extends NextApiResponse {
    socket: MySocket;
}

export default function socketMiddleware(
    req: AuthMiddlewareRequest,
    res: SocketResponse
) {
    {
        const { server } = res.socket;
        if (server.io) return res.end();

        try {
            res.socket.server.io = socket;

            return res.end();
        } catch (error) {
            return res.status(500).json({
                error: JSON.stringify(error),
                message: "Internal server error"
            });
        }
    }
}
