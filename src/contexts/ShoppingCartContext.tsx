import { ShoppingCartDrawer } from "@/components/ShoppingCartDrawer";
import { ShoppingCartProductDTO } from "@/DTOs/ShoppingCartProductDTO";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductCartI as ShoppingCartProductI } from "@/interfaces/product-cart-interface";
import { ProductI } from "@/interfaces/product-interface";
import products from "@/items.json";
import { api } from "@/utils/api";
// import { ProductI } from "@/interfaces/product-interface";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { useUser } from "./UserContext";

interface ShoppingCartContextProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;

    productsInCart: ShoppingCartProductI[];
    setProductsInCart: Dispatch<SetStateAction<ShoppingCartProductI[]>>;

    // handleAddProduct: (product: ProductI) => Promise<void>;
    // handleSetProduct: (product: ShoppingCartProductI) => Promise<void>;
    handleRemoveProduct: (productId: number) => void;
    handleAddProductAmount: (product: ProductI) => void;
    handleRemoveProductAmount: (productId: number) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const { isAuthenticated } = useUser();
    const [productsInCart, setProductsInCart] = useState(
        [] as ShoppingCartProductI[]
    );
    const productsInCartDebounce = useDebounce(productsInCart, 500);
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
    function handleRemoveProduct(productId: number) {
        setProductsInCart(p => p.filter(({ id }) => productId !== id));
    }
    const getShoppingCartProduct = async () => {
        try {
            const { data } = await api.get("/shopping-cart/list");
            const map = (x: ShoppingCartProductDTO) => {
                const product = products.find(p => p.id === x.productId);
                if (!product) return null;
                return {
                    ...product,
                    amount: x.amount
                };
            };
            const _products = data.map(map).filter(Boolean);
            setProductsInCart(_products);
        } catch {}
    };

    const updateProductsList = () => {
        const map = (x: ShoppingCartProductI): ShoppingCartProductDTO => ({
            amount: x.amount,
            productId: x.id
        });
        api.post("/shopping-cart/set", productsInCartDebounce.map(map));
    };

    useEffect(() => {
        if (productsInCart.length === 0) return;
        updateProductsList();
    }, [productsInCartDebounce]);

    useEffect(() => {
        if (!isAuthenticated) return setProductsInCart([]);
        if (productsInCart.length > 0) return;

        getShoppingCartProduct();
    }, [isAuthenticated]);

    // async function handleSetProduct(product: ShoppingCartProductI) {
    //     if (product.amount === 0) return handleRemoveProduct(product.id);

    //     try {
    //         const { amount, id } = product;
    //         const shoppingCartProduct: ShoppingCartProductDTO = {
    //             amount,
    //             productId: id
    //         };
    //         await addProduct(shoppingCartProduct);
    //         setProductsInCart(p =>
    //             p.map(x => (x.id === product.id ? product : x))
    //         );
    //     } catch {}
    // }
    // async function handleAddProduct(product: ProductI) {
    //     try {
    //         const shoppingCartProductDto: ShoppingCartProductDTO = {
    //             amount: 1,
    //             productId: product.id
    //         };

    //         await addProduct(shoppingCartProductDto);

    //         const shoppingCartProduct = { ...product, amount: 1 };
    //         setProductsInCart(p => [...p, shoppingCartProduct]);
    //     } catch {}
    // }
    // const addProduct = (shoppingCartProduct: ShoppingCartProductDTO) =>
    //     api.post("/shopping-cart/add", shoppingCartProduct);

    return (
        <ShoppingCartContext.Provider
            value={{
                isDrawerOpen,
                setIsDrawerOpen,
                productsInCart,
                setProductsInCart,
                handleRemoveProduct,
                // handleSetProduct,
                // handleAddProduct
                handleAddProductAmount,
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
