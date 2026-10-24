import createStorageClient from "@/shared/utils/storage-utils";

const useIsAuthenticated = (): boolean => {
    const { checkIfExists } = createStorageClient("local");

    return checkIfExists("accessToken");
};

export default useIsAuthenticated;
