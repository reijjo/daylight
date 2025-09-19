import close from "../../../../assets/images/close.png";

interface CloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    ariaLabel: string;
    topRight?: string;
}

export const CloseButton = ({
    onClick,
    ariaLabel,
    topRight = "2",
}: CloseButtonProps) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            className={`absolute top-${topRight} right-${topRight} cursor-pointer bg-white/50 hover:bg-white/70 p-1 grid place-items-center rounded-full hover:scale-110 active:scale-90 transition-all duration-150 ease-in`}
        >
            <img
                src={close}
                title="close"
                alt="close"
                className="h-4 w-4"
                aria-hidden="true"
            />
        </button>
    );
};
