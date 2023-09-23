import { ShoppingCartProductDTO } from "@/DTOs/ShoppingCartProductDTO";

import { Validator } from "./interfaces/Validator";

export class ShoppingCartProductValidator
    implements Validator<ShoppingCartProductDTO>
{
    validate(product: ShoppingCartProductDTO): string[] {
        const errors: string[] = [];

        if (!product.productId) {
            errors.push("Product ID is required.");
        }

        if (!product.amount || product.amount <= 0) {
            errors.push(
                `Product ${product.productId} has amount must be greater than zero.`
            );
        }

        return errors.length === 0;
    }
}
