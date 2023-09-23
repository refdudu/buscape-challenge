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
const main = async (req: AuthMiddlewareRequest, res: NextApiResponse) => {
    const { userId, method } = req;
    if (method !== "GET") return res.status(405).send("");

    const shoppingCartService = new ShoppingCartService(userId);
    const products = await shoppingCartService.list();

    return res.status(200).json(products);
};
