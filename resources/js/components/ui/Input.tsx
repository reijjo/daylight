import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    id: string;
}

export const Input = ({ type = "text", id, ...rest }: InputProps) => {
    return (
        <div className="flex flex-col w-full gap-1">
            <input
                type={type}
                {...rest}
                className="border bg-white/80 px-4 py-2 rounded-4xl h-12 placeholder:text-black/60 text-black"
            />
        </div>
    );
};
