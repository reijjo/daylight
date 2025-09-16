interface MessageProps {
    message: string | undefined;
    type: "success" | "error" | "info";
}

export const Message = ({ message, type }: MessageProps) => (
    <div
        className={`px-4 py-1 border rounded-2xl w-full text-center mt-2 ${
            type === "error" && "bg-red-50 text-red-700 border-red-700"
        } ${type === "success" && "bg-green-50 text-green-700 border-green-700"}
				${type === "info" && "bg-blue-50 text-blue-700 border-blue-700"}
				`}
    >
        <p>{message}</p>
    </div>
);
