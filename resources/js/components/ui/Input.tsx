import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    label?: string;
    id: string;
}

export const Input = ({ type = "text", id, label, ...rest }: InputProps) => {
    return (
        <div className="flex flex-col w-full gap-1">
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                {...rest}
                className="border bg-white/80 px-4 py-2 rounded-4xl h-12 placeholder:text-black/60 text-black"
            />
        </div>
    );
};
