import { message } from "antd";
import {
    MESSAGE_SEVERITY,
    DEFAULT_MESSAGE_TIMEOUT,
} from "@/shared/constants/message";
import { type MESSAGE_SEVERITY_TYPES } from "@/shared/types/messages";

export const showInfo = (
    infoMessage: string,
    timeout: number = DEFAULT_MESSAGE_TIMEOUT,
) => {
    message.info(infoMessage, timeout);
};

export const showError = (
    content: string,
    timeout: number = DEFAULT_MESSAGE_TIMEOUT,
) => {
    message.error(content, timeout);
};

export const showWarning = (
    content: string,
    timeout: number = DEFAULT_MESSAGE_TIMEOUT,
) => {
    message.warning(content, timeout);
};

export const showSuccess = (
    content: string,
    timeout: number = DEFAULT_MESSAGE_TIMEOUT,
) => {
    message.success(content, timeout);
};

const showMessage = (
    content: string,
    severity: MESSAGE_SEVERITY_TYPES,
    timeout: number = DEFAULT_MESSAGE_TIMEOUT,
) => {
    switch (severity) {
        case MESSAGE_SEVERITY.INFO: {
            showInfo(content, timeout);
            break;
        }
        case MESSAGE_SEVERITY.WARNING: {
            showWarning(content, timeout);
            break;
        }
        case MESSAGE_SEVERITY.ERROR: {
            showError(content, timeout);
            break;
        }
        case MESSAGE_SEVERITY.SUCCESS: {
            showSuccess(content, timeout);
            break;
        }
        default: {
            showInfo(content, timeout);
            break;
        }
    }
};

export default showMessage;
