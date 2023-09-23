import { ShoppingCartProductDTO } from "@/DTOs/ShoppingCartProductDTO";
import { firebaseDatabase } from "@/utils/firebase";
import {
    DatabaseReference,
    child,
    get,
    ref,
    remove,
    set
} from "firebase/database";

export class ShoppingCartService {
    private dbRef: DatabaseReference;
    constructor(userId: string) {
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
    private getProductChild(productId: number) {
        return child(this.dbRef, `/${productId}`);
    }
    // private _getProduct(productId: number) {
    //     return get(this.getProductChild(productId));
    // }
}
