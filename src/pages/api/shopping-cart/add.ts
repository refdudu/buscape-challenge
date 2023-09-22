// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AuthMiddlewareRequest, authMiddleware } from "@/api/middleware/auth";
import { ShoppingCartService } from "@/api/services/ShoppingCartService";
import { ShoppingCartProductDTO } from "@/DTOs/ShoppingCartProductDTO";
import { ShoppingCartProductValidator } from "@/validation/ShoppingCartValidator";
import type { NextApiResponse } from "next";

interface ShoppingCartAddRequest extends AuthMiddlewareRequest {
    body: ShoppingCartProductDTO;
}

export default function handler(
    req: ShoppingCartAddRequest,
    res: NextApiResponse
) {
    return authMiddleware(req, res, main);
}
const main = (req: ShoppingCartAddRequest, res: NextApiResponse) => {
    const { userId, method, body: shoppingCartProduct } = req;
    if (method !== "POST") return res.status(405).send("");

    const validator = new ShoppingCartProductValidator();
    const errors = validator.validate(shoppingCartProduct);
    if (errors.length > 0) res.status(400).json({ errors });

    const shoppingCartService = new ShoppingCartService(userId);
    shoppingCartService.add(shoppingCartProduct);

    return res.status(200).json({});
};
