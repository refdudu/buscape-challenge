import { ShoppingCartDrawer } from "@/components/ShoppingCartDrawer";
import { ProductCartI } from "@/interfaces/product-cart-interface";
import { ProductI } from "@/interfaces/product-interface";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState
} from "react";

interface ShoppingCartContextProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;

    productsInCart: ProductCartI[];
    setProductsInCart: Dispatch<SetStateAction<ProductCartI[]>>;

    handleAddProduct: (product: ProductI) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [productsInCart, setProductsInCart] = useState([] as ProductCartI[]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function handleAddProduct(_product: ProductI) {
        setProductsInCart(p => {
            const product = p.find(({ id }) => id === _product.id);

            if (!product) return [...p, { ..._product, amount: 1 }];

            return p.map(_product =>
                product.id === _product.id
                    ? { ..._product, amount: _product.amount + 1 }
                    : _product
            );
        });
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                isDrawerOpen,
                setIsDrawerOpen,
                productsInCart,
                setProductsInCart,
                handleAddProduct
            }}>
            <ShoppingCartDrawer
                isOpen={isDrawerOpen}
                setIsOpen={setIsDrawerOpen}
            />
            {children}
        </ShoppingCartContext.Provider>
    );
}
export const useShoppingCart = () => useContext(ShoppingCartContext);
