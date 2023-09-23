import { ProductCard } from "@/components/ProductCard";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { useUser } from "@/contexts/UserContext";
import products from "@/items.json";
import { ShoppingCartSimple } from "@phosphor-icons/react";

import { Badge } from "../Badge";
import { Profile } from "../Profile";

export function Home() {
    const { signIn, user, signOut, isAuthenticated } = useUser();
    const { setIsDrawerOpen, handleAddProductAmount, productsInCart } =
        useShoppingCart();

    function openDrawer() {
        setIsDrawerOpen(true);
    }
    return (
        <div className="bg-zinc-100 h-screen">
            <header className="bg-cyan-500 w-full px-8 max-h-[3rem]">
                <div className="flex items-center justify-between max-w-7xls h-12">
                    <Profile {...{ signOut, signIn, user }} />
                    <div className="cursor-pointer h-10 w-10 flex items-center justify-center hover:bg-hover rounded-full transition">
                        {isAuthenticated && (
                            <Badge total={productsInCart.length}>
                                <ShoppingCartSimple
                                    onClick={openDrawer}
                                    width={28}
                                    height={28}
                                />
                            </Badge>
                        )}
                    </div>
                </div>
            </header>

            <main className="pt-8 w-full px-8 overflow-auto h-[calc(100%-3rem)]">
                <div className="grid-container max-w-7xls">
                    {[...products, ...products].map(product => (
                        <ProductCard
                            handleAddInCart={() =>
                                handleAddProductAmount(product)
                            }
                            key={product.id}
                            product={product}
                            disabledShopButton={!isAuthenticated}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
{
    /**sm: Dispositivos com largura a partir de 640px.
md: Dispositivos com largura a partir de 768px.
lg: Dispositivos com largura a partir de 1024px.
xl: Dispositivos com largura a partir de 1280px.
2xl: Dispositivos com largura a partir de 1536px. */
}
