import { ProductCartI } from "@/interfaces/product-cart-interface";
import { Minus, Plus, X } from "@phosphor-icons/react";
import { useMemo } from "react";

interface ProductCardProps {
    product: ProductCartI;
    handleRemove: () => void;
    handleAddAmount: () => void;
    handleRemoveAmount: () => void;
}

export function ProductItem({
    product,
    handleRemove,
    handleRemoveAmount,
    handleAddAmount
}: ProductCardProps) {
    const [image] = product.images;

    const { installmentValue, totalValue } = useMemo(() => {
        const formatOptions = {
            style: "currency",
            currency: "BRL"
        };
        const format = (value: number) =>
            new Intl.NumberFormat("pt-BR", formatOptions).format(value);

        const installmentValue = format(product.price.installmentValue);
        const totalValue = format(product.price.value);

        return {
            installmentValue,
            totalValue
        };
    }, []);

    return (
        <div className="flex-row w-full flex items-center flex-1 border-b last-of-type:border-0 border-cyan-500 py-2">
            <div className="group w-28 h-16 flex items-center justify-center">
                <img
                    className="flex-1 w-full h-full object-contain"
                    src={image}
                />
            </div>
            <div className="ml-2 flex-1 w-full flex flex-col">
                <div className="flex justify-between items-start">
                    <span className="text-sm mb-2 inline-block font-medium text-zinc-700">
                        {product.name}
                    </span>
                    <div
                        onClick={handleRemove}
                        className="self-start p-2 ml-2 rounded-full transition-colors cursor-pointer hover:bg-hover"
                    >
                        <X />
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-sm text-zinc-500 ">
                            {product.price.installments}x {installmentValue}
                        </span>
                        <span className="text-sm text-zinc-900 bold font-semibold">
                            ou {totalValue} á vista
                        </span>
                    </div>
                    <div className="mr-2">
                        <Counter
                            add={handleAddAmount}
                            remove={handleRemoveAmount}
                            count={product.amount}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
interface CounterProps {
    count: number;
    add: () => void;
    remove: () => void;
}
function Counter({ add, remove, count }: CounterProps) {
    return (
        <div className="flex items-center bg-blue-100 gap-2 px-4 py-1 text-md text-zinc-700 rounded-sm">
            <div onClick={remove} className="cursor-pointer">
                <Minus />
            </div>
            <span>{count}</span>
            <div onClick={add} className="cursor-pointer">
                <Plus />
            </div>
        </div>
    );
}
