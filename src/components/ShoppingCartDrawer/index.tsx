import { Dispatch, SetStateAction } from "react";
import { Drawer } from "../Drawer";
import { ProductItem } from "./ProductItem";

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
import products from "@/items.json";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

export function ShoppingCartDrawer({
  isOpen,
  setIsOpen,
}: ShoppingCartDrawerProps) {
  const { productsInCart, setProductsInCart } = useShoppingCart();

  function handleRemoveProduct(productId: number) {
    setProductsInCart((p) => p.filter(({ id }) => productId !== id));
  }

  return (
    <Drawer setIsOpen={setIsOpen} isOpen={isOpen}>
      {productsInCart.map((product) => (
        <ProductItem
          key={product.id}
          handleRemove={() => handleRemoveProduct(product.id)}
          product={product}
        />
      ))}
    </Drawer>
  );
}
