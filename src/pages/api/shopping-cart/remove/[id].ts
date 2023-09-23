// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AuthMiddlewareRequest, authMiddleware } from "@/api/middleware/auth";
import { ShoppingCartService } from "@/api/services/ShoppingCartService";
import type { NextApiResponse } from "next";

export default function handler(
    req: AuthMiddlewareRequest,
    res: NextApiResponse
) {
    return authMiddleware(req, res, main);
}
const main = (req: AuthMiddlewareRequest, res: NextApiResponse) => {
    const { userId, method, query } = req;
    if (method !== "DELETE") return res.status(405).send("");
    const { id } = query;
    const productId = Number(id);

    if (isNaN(productId) || productId === 0)
        return res.status(400).send({ error: "Invalid product ID." });

    const shoppingCartService = new ShoppingCartService(userId);
    shoppingCartService.remove(productId);

    return res.status(200).json({});
};
