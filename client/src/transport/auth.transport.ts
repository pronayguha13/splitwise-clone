import axios from "axios";
import instance from "@/transport";

const authService = axios.create({
    ...instance.defaults,
    baseURL: `${(instance.defaults.baseURL ?? "").replace(/\/$/, "")}/auth`,
});

export default authService;
