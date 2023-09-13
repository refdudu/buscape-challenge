interface BadgeProps {
    children: React.ReactNode;
    total?: number;
}

export function Badge({ children, total }: BadgeProps) {
    return (
        <div className="relative">
            {total && (
                <div className="absolute -right-3 -top-2 bg-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
                    {total}
                </div>
            )}
            {children}
        </div>
    );
}
