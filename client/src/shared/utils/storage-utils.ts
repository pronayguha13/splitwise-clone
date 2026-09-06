const createStorageClient = (type: "session" | "local" = "session") => {
    const provider = type === "session" ? sessionStorage : localStorage;

    const storeData = <T>(key: string, value: T) => {
        let serializedValue: string | undefined;

        try {
            serializedValue =
                typeof value === "string" ? value : JSON.stringify(value);
        } catch {
            throw new TypeError(
                `Unable to serialize storage value for "${key}"`,
            );
        }

        if (serializedValue === undefined) {
            throw new TypeError("Storage values must be serializable");
        }

        provider.setItem(key, serializedValue);
    };

    const getData = (key: string): Record<string, never> | null => {
        try {
            const data = provider.getItem(key);

            return data === null ? null : JSON.parse(data);
        } catch {
            throw new Error("Something went wrong");
        }
    };

    const checkIfExists = (key: string): boolean => {
        return provider.getItem(key) !== null;
    };

    const removeData = (key: string) => {
        provider.removeItem(key);
    };

    return { storeData, getData, removeData, checkIfExists };
};

export default createStorageClient;
