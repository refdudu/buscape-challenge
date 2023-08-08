import { ProductI } from "@/interfaces/product-interface";
import { X } from "@phosphor-icons/react";
import { useMemo, useState } from "react";

interface ProductCardProps {
    product: ProductI;
    handleRemove: () => void;
}

export function ProductItem({ product, handleRemove }: ProductCardProps) {
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
        <div className="flex-row w-full flex justify-center items-center flex-1 border-b last-of-type:border-0 border-cyan-500">
            <div className="group w-28 h-16 flex items-center justify-center">
                <img
                    className="flex-1 w-full h-full object-contain"
                    src={image}
                />
            </div>
            <div className="ml-2 flex-1 w-full flex flex-col">
                <span className="text-sm mb-2 inline-block font-medium text-zinc-700">
                    {product.name}
                </span>
                <div className="flex flex-col mb-2">
                    <span className="text-sm text-zinc-500 ">
                        {product.price.installments}x {installmentValue}
                    </span>
                    <span className="text-sm text-zinc-900 bold font-semibold">
                        ou {totalValue} á vista
                    </span>
                </div>
            </div>
            <div
                onClick={handleRemove}
                className="self-start p-2 mt-2 ml-2 rounded-full transition-colors cursor-pointer hover:bg-hover">
                <X />
            </div>
        </div>
    );
}
