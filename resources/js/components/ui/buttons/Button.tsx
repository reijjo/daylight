interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    ariaLabel?: string;
    secondary?: boolean;
}

export const Button = ({
    children,
    ariaLabel,
    secondary,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`border  px-4 py-2 rounded-4xl cursor-pointer whitespace-nowrap active:scale-90 transition-all duration-150 ease-in disabled:opacity-50 disabled:cursor-not-allowed ${
                secondary
                    ? "hover:border-white hover:bg-black/50 border-white/40"
                    : "bg-emerald-800/75 hover:bg-emerald-700 border-white/20"
            }`}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </button>
    );
};
