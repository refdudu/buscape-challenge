import { Power } from "@phosphor-icons/react";
import { User } from "firebase/auth";

interface ProfileProps {
    user: User | null;
    signIn: () => void;
    signOut: () => void;
}

export function Profile({ user, signIn, signOut }: ProfileProps) {
    const containerCss =
        "flex items-center rounded bg-blue-200 cursor-pointer hover:bg-blue-300 transition-colors";

    if (!user)
        return (
            <div onClick={signIn} className={`${containerCss} gap-2 py-1 px-3`}>
                <img
                    className="w-full max-h-[28px]"
                    src="https://logosmarcas.net/wp-content/uploads/2020/09/Google-Logo.png"
                />
            </div>
        );

    const name = user.displayName || user.email?.split("@")[0] || "";
    const image = user.providerData[0].photoURL;

    return (
        <div onClick={signOut} className={`${containerCss} gap-3 p-2`}>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                    {image && <img src={image} alt={name} />}
                </div>
                <span className="text-sm font-medium text-zinc-700">
                    {name}
                </span>
            </div>
            <Power />
        </div>
    );
}
