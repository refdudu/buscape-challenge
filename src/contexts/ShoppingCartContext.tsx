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

    handleAddProductAmount: (product: ProductI) => void;
    handleRemoveProductAmount: (productId: number) => void;
    handleRemoveProduct: (productId: number) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [productsInCart, setProductsInCart] = useState([] as ProductCartI[]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function handleAddProductAmount(_product: ProductI) {
        setProductsInCart(p => {
            const product = p.find(({ id }) => id === _product.id);
            if (!product) return [...p, { ..._product, amount: 1 }];

            return p.map(x => ({
                ...x,
                amount: product.id === x.id ? x.amount + 1 : x.amount
            }));
        });
    }

    function handleRemoveProduct(productId: number) {
        setProductsInCart(p => p.filter(({ id }) => productId !== id));
    }
    function handleRemoveProductAmount(productId: number) {
        setProductsInCart(p => {
            const product = p.find(x => x.id === productId);
            if (!product) return p;
            if (product.amount === 1) return p.filter(x => x.id !== productId);

            return p.map(x => ({
                ...x,
                amount: x.id === productId ? x.amount - 1 : x.amount
            }));
        });
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                isDrawerOpen,
                setIsDrawerOpen,
                productsInCart,
                setProductsInCart,
                handleAddProductAmount,
                handleRemoveProduct,
                handleRemoveProductAmount
            }}
        >
            <ShoppingCartDrawer
                isOpen={isDrawerOpen}
                setIsOpen={setIsDrawerOpen}
            />
            {children}
        </ShoppingCartContext.Provider>
    );
}
export const useShoppingCart = () => useContext(ShoppingCartContext);
