// import { DecodedIdToken } from "firebase-admin/auth";
// import { NextApiRequest, NextApiResponse } from "next";

import { firebaseAdmin } from "@/api/utils/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export interface AuthMiddlewareRequest extends NextApiRequest {
    userId: string;
}

const verifyIdToken = async (token: string) => {
    try {
        const _token = await firebaseAdmin.auth().verifyIdToken(token);
        return _token;
    } catch {}
};

export const authMiddleware = async (
    req: AuthMiddlewareRequest,
    res: NextApiResponse,
    next: (req: AuthMiddlewareRequest, res: NextApiResponse) => void
) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "Token not provided" });

    const user = await verifyIdToken(token);
    if (!user) return res.status(401).json({ error: "Token not valid" });

    try {
        req.userId = user.uid;
        return next(req, res);
    } catch (error) {
        return res.status(500).json({
            error: JSON.stringify(error),
            message: "Internal server error"
        });
    }
};
