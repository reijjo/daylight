import { useEffect, useState } from "react";
import { Message } from "../ui/Message";
import { nullMessage, MessageProps } from "../../utils";

export const NoApiAccess = () => {
    const [noApi, setNoApi] = useState<MessageProps>({
        message: "No API access on mobile view",
        type: "error",
    });

    useEffect(() => {
        const id = setTimeout(() => setNoApi(nullMessage), 5000);
        return () => clearTimeout(id);
    }, []);

    return <Message message={noApi.message} type={noApi.type} />;
};
