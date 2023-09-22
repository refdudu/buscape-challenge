import { ShoppingCartProductDTO } from "@/DTOs/ShoppingCartProductDTO";
import { firebaseDatabase } from "@/utils/firebase";
import { DatabaseReference, child, get, ref, set } from "firebase/database";

export class ShoppingCartService {
    private dbRef: DatabaseReference;
    constructor(userId: string) {
        this.dbRef = ref(firebaseDatabase, `shoppingCartProducts/${userId}`);
    }
    async add({ amount, productId }: ShoppingCartProductDTO) {
        // const product = await this.getProduct(productId);

        await set(child(this.dbRef, `/${productId}`), amount);
        return amount;
    }
    getProduct(productId: string) {
        return get(child(this.dbRef, `/${productId}`));
    }
}
