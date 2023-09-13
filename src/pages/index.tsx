import { Home } from "@/components/pages/Home";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import { UserProvider } from "@/contexts/UserContext";

export default function index() {
    return (
        <UserProvider>
            <ShoppingCartProvider>
                <Home />
            </ShoppingCartProvider>
        </UserProvider>
    );
}
{
    /**sm: Dispositivos com largura a partir de 640px.
md: Dispositivos com largura a partir de 768px.
lg: Dispositivos com largura a partir de 1024px.
xl: Dispositivos com largura a partir de 1280px.
2xl: Dispositivos com largura a partir de 1536px. */
}
