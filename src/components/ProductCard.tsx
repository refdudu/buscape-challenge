import { ProductI } from "@/interfaces/product-interface";
import { useMemo, useState } from "react";

import { Button } from "./Button";
import { ImageSelector } from "./ImageSelector";

interface ProductCardProps {
    product: ProductI;
    handleAddInCart: () => void;
    disabledShopButton: boolean;
}

export function ProductCard({
    product,
    handleAddInCart,
    disabledShopButton = false
}: ProductCardProps) {
    const [image] = product.images;
    const [selectedImage, setSelectedImage] = useState(image);

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
        <div className="flex-row w-full bg-white flex md:flex-col justify-center items-center flex-1 h-full rounded-md">
            <div className="group w-56 h-48 flex items-center justify-center relative">
                <img
                    className="flex-1 w-full h-full p-8 object-contain ml-8 md:ml-0"
                    src={selectedImage}
                />
                <ImageSelector
                    selectedImage={selectedImage}
                    onClick={setSelectedImage}
                    images={product.images}
                />
            </div>
            <div className="px-4 py-2 md:bg-blue-100 flex-1 rounded-md w-full flex flex-col">
                <span className="text-sm mb-2 inline-block font-medium text-zinc-700">
                    {product.name}
                </span>
                <div className="flex flex-col mb-2">
                    <span className="text-xl text-zinc-900 bold font-semibold">
                        {totalValue}
                    </span>
                    <span className="text-xs text-zinc-500 ">
                        Em até {product.price.installments}x de{" "}
                        {installmentValue} sem juros
                    </span>
                </div>
                <Button disabled={disabledShopButton} onClick={handleAddInCart}>
                    Adicionar ao carrinho
                </Button>
            </div>
        </div>
    );
}
