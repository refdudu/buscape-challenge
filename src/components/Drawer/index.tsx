import { X } from "@phosphor-icons/react";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import ModernDrawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";

interface ModernDrawerProps {
    onClose?: () => void;
    direction?: "left" | "right" | "top" | "bottom";
    lockBackgroundScroll?: boolean;
    children?: React.ReactNode;
    duration?: number;
    overlayOpacity?: number;
    overlayColor?: string;
    enableOverlay?: boolean;
    style?: React.CSSProperties;
    zIndex?: number;
    size?: number | string;
    className?: string;
    customIdSuffix?: string;
    overlayClassName?: string;
}
interface DrawerProps extends ModernDrawerProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

export function Drawer({
    isOpen,
    setIsOpen,
    children,
    direction = "right",
    ...props
}: DrawerProps) {
    const toggleDrawer = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <ModernDrawer
            open={isOpen}
            onClose={toggleDrawer}
            size={400}
            lockBackgroundScroll
            duration={300}
            {...{ ...props, direction }}
        >
            <header className="py-4 px-4 flex flex-1 justify-end bg-zinc-300">
                <X
                    onClick={toggleDrawer}
                    size={16}
                    className="text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
                />
            </header>
            <main className="p-4 overflow-auto h-[calc(100%-3rem)]">
                {children}
            </main>
        </ModernDrawer>
    );
}
