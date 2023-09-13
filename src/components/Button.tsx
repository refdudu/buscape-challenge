import { HtmlHTMLAttributes } from "react";

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
    const className = `cursor-pointer w-full mt-auto flex items-center justify-center bg-cyan-500 text-white h-9 px-4 rounded-sm filter hover:brightness-105 transition ${props.className}`;
    return (
        <button
            // onClick={handleAddInCart}
            {...props}
            className={className}
        />
    );
}
