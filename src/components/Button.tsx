import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
    const disabledClassName =
        "disabled:opacity-50 disabled:pointer-events-none";
    const className = `${disabledClassName} cursor-pointer w-full mt-auto flex items-center justify-center bg-cyan-500 text-white py-1 px-4 rounded-sm filter hover:brightness-105 transition ${props.className}`;
    return (
        <button
            // onClick={handleAddInCart}
            {...props}
            className={className}
        />
    );
}
