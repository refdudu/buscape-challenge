// import { DecodedIdToken } from "firebase-admin/auth";
// import { NextApiRequest, NextApiResponse } from "next";

// import { firebaseAdmin } from "../utils/firebase-admin";

// export interface AuthMiddlewareRequest extends NextApiRequest {
//     user?: DecodedIdToken;
// }

// const verifyIdToken = async (token: string) => {
//     const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
//     return decodedToken;
// };

// export const authMiddleware =
//     (handler: (req: AuthMiddlewareRequest, res: NextApiResponse) => void) =>
//     async (req: AuthMiddlewareRequest, res: NextApiResponse) => {
//         const token = req.headers.authorization?.split("Bearer ")[1];

//         if (!token) {
//             return res.status(401).json({ error: "Unauthorized" });
//         }

//         try {
//             const decodedToken = await verifyIdToken(token);
//             req.user = decodedToken;
//             return handler(req, res);
//         } catch (error) {
//             return res.status(403).json({ error: "Forbidden" });
//         }
//     };
