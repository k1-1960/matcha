export const SolidButton = ({
    children,
    onClick,
    className = "",
    type = undefined,
}: {
    children: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}) => {
    return (
        <button
            onClick={onClick}
            className={
                "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full px-4 py-2 font-bold " +
                className
            }
            type={type}
        >
            {children}
        </button>
    );
};

export const OutlineButton = ({
    children,
    onClick,
    className = "",
    type = undefined,
}: {
    children: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}) => {
    return (
        <button
            onClick={onClick}
            className={
                "bg-transparent text-cyan-500 rounded-full px-4 py-2 font-bold " +
                className
            }
            type={type}
        >
            {children}
        </button>
    );
};

export const LightButton = ({
    children,
    type = undefined,
    onClick,
    className = "",
}: {
    children: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}) => {
    return (
        <button
            onClick={onClick}
            className={
                "bg-slate-400 text-white rounded-full px-4 py-2 font-bold " +
                className
            }
            type={type}
        >
            {children}
        </button>
    );
};
