"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { logger } from "@/lib/logger";

export default function Error({ error, reset }) {
    useEffect(() => {
        logger.error("Global Error Boundary Caught Exception", error);
    }, [error]);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                We encountered an unexpected error. Our team has been notified.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => window.location.reload()} variant="outline">Reload Page</Button>
                <Button onClick={reset}>Try Again</Button>
            </div>
        </div>
    );
}
