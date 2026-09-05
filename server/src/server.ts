import dotenv from "dotenv";
import type { Server } from "node:http";

import app from "./app";
import connectDB, { disconnectDB } from "./config/db";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;
let server: Server | undefined;

const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
    console.log(`${signal} received. Closing server...`);

    if (server) {
        await new Promise<void>((resolve, reject) => {
            server?.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    await disconnectDB();

    if (signal === "SIGUSR2") {
        process.kill(process.pid, signal);
        return;
    }

    process.exit(0);
};

const handleShutdown = (signal: NodeJS.Signals): void => {
    void shutdown(signal).catch((error) => {
        const message =
            error instanceof Error ? error.message : "Unknown shutdown error";
        console.error(`Failed to shut down cleanly: ${message}`);
        process.exit(1);
    });
};

const startServer = async (): Promise<void> => {
    try {
        await connectDB();

        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error(`Failed to start server: ${message}`);
        await disconnectDB();
        process.exit(1);
    }
};

process.once("SIGINT", handleShutdown);
process.once("SIGTERM", handleShutdown);
process.once("SIGUSR2", handleShutdown);

void startServer();
