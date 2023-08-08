import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import { Home } from "@/components/pages/Home";
import { Toaster } from "react-hot-toast";

export default function index() {
    return (
        <ShoppingCartProvider>
            <Toaster />
            <Home />
        </ShoppingCartProvider>
    );
}
{
    /**sm: Dispositivos com largura a partir de 640px.
md: Dispositivos com largura a partir de 768px.
lg: Dispositivos com largura a partir de 1024px.
xl: Dispositivos com largura a partir de 1280px.
2xl: Dispositivos com largura a partir de 1536px. */
}
