import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ShoppingCart } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

import { Button } from "../Button";
import { Drawer } from "../Drawer";

import { ProductItem } from "./ProductItem";

interface ShoppingCartDrawerProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ShoppingCartDrawer({
    isOpen,
    setIsOpen
}: ShoppingCartDrawerProps) {
    const {
        productsInCart,
        handleRemoveProductAmount,
        handleRemoveProduct,
        handleAddProductAmount
    } = useShoppingCart();
    const closeDrawer = () => setIsOpen(false);
    return (
        <Drawer setIsOpen={setIsOpen} isOpen={isOpen}>
            {productsInCart.length > 0 ? (
                productsInCart.map(product => (
                    <ProductItem
                        key={product.id}
                        handleRemove={() => handleRemoveProduct(product.id)}
                        handleAddAmount={() => handleAddProductAmount(product)}
                        handleRemoveAmount={() =>
                            handleRemoveProductAmount(product.id)
                        }
                        product={product}
                    />
                ))
            ) : (
                <div className="flex-1 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <ShoppingCart className="text-zinc-700" size="48" />
                        <span>Seu carrinho está vazio</span>
                    </div>
                    <Button onClick={closeDrawer}>
                        Voltar para as compras
                    </Button>
                </div>
            )}
        </Drawer>
    );
}
