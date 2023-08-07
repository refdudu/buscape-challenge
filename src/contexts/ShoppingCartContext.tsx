import { ShoppingCartDrawer } from "@/components/ShoppingCartDrawer";
import { ProductI } from "@/interfaces/product-interface";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ShoppingCartContextProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;

  productsInCart: ProductI[];
  setProductsInCart: Dispatch<SetStateAction<ProductI[]>>;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [productsInCart, setProductsInCart] = useState([] as ProductI[]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
        productsInCart,
        setProductsInCart,
      }}
    >
      <ShoppingCartDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      {children}
    </ShoppingCartContext.Provider>
  );
}
export const useShoppingCart = () => useContext(ShoppingCartContext);
