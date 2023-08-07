import { ShoppingCartSimple } from "@phosphor-icons/react";
import products from "@/items.json";
import { ProductCard } from "@/components/ProductCard";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ProductI } from "@/interfaces/product-interface";

export function Home() {
  const { setIsDrawerOpen, setProductsInCart } = useShoppingCart();

  function openDrawer() {
    setIsDrawerOpen(true);
  }
  function handleAddProduct(product: ProductI) {
    setProductsInCart((p) => {
      const hasProduct = p.some(({ id }) => id === product.id);

      if (!hasProduct) return [...p, product];
      return p;
    });
  }

  return (
    <>
      <div className="bg-zinc-100 h-screen">
        <header className="bg-cyan-500 w-full px-8 h-12 flex items-center justify-end">
          <div className="cursor-pointer h-10 w-10 flex items-center justify-center hover:bg-hover rounded-full transition">
            <ShoppingCartSimple onClick={openDrawer} width={28} height={28} />
          </div>
        </header>

        <main className=" pt-8 w-full px-8 overflow-auto h-[calc(100%-4.5rem)]">
          <div className="grid-container max-w-5xl mx-auto">
            {[...products, ...products, ...products, ...products].map(
              (product) => (
                <ProductCard
                  handleAddInCart={() => handleAddProduct(product)}
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        </main>
      </div>
    </>
  );
}
{
  /**sm: Dispositivos com largura a partir de 640px.
md: Dispositivos com largura a partir de 768px.
lg: Dispositivos com largura a partir de 1024px.
xl: Dispositivos com largura a partir de 1280px.
2xl: Dispositivos com largura a partir de 1536px. */
}
