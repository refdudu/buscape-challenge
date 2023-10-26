import { ShoppingCartProductDTO } from "@/DTOs/ShoppingCartProductDTO";
import { firebaseDatabase } from "@/utils/firebase";
import {
    DatabaseReference,
    child,
    get,
    onValue,
    ref,
    remove,
    set
} from "firebase/database";

import { socket, socketClients } from "../utils/socket";

export class ShoppingCartService {
    private dbRef: DatabaseReference;
    private userId: string;
    constructor(userId: string) {
        this.userId = userId;
        this.dbRef = ref(firebaseDatabase, `shoppingCartProducts/${userId}`);
    }

    update(products: ShoppingCartProductDTO[]) {
        const updates = Object.entries(products).reduce(
            (pV, [, value]) => ({
                ...pV,
                [`${value.productId}`]: value.amount
            }),
            {}
        );
        return set(this.dbRef, updates);
    }
    async list() {
        const snapShot = await get(this.dbRef);
        const productsRecord = snapShot.val() as Record<string, number>;

        if (!productsRecord) return [];

        const products = Object.entries(productsRecord).map(
            ([productId, amount]): ShoppingCartProductDTO => ({
                amount,
                productId: Number(productId)
            })
        );
        return products;
    }
    add({ amount, productId }: ShoppingCartProductDTO) {
        return set(this.getProductChild(productId), amount);
    }
    remove(productId: number) {
        return remove(this.getProductChild(productId));
    }
    onChange() {
        return onValue(this.dbRef, snapshot => {
            const productsRecord = snapshot.val() as Record<string, number>;

            const products = Object.entries(productsRecord).map(
                ([productId, amount]): ShoppingCartProductDTO => ({
                    amount,
                    productId: Number(productId)
                })
            );
            console.log(
                "🚀 ~ file: ShoppingCartService.ts:64 ~ ShoppingCartService ~ onChange ~ this.userId:",
                this.userId
            );
            socketClients[this.userId]?.emit("shoppingCartProducts", products);
        });
    }
    private getProductChild(productId: number) {
        return child(this.dbRef, `/${productId}`);
    }
    // private _getProduct(productId: number) {
    //     return get(this.getProductChild(productId));
    // }
}
