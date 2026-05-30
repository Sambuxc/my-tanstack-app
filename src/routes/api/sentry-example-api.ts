import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sentry-example-api")({
    server: {
        handlers: {
            GET: () => {
                // throw new Error("Sentry Example Route Error");
                return new Response(
                    JSON.stringify({ message: "Testing Sentry Error..." }),
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        status: 508,
                    },
                );
            },
        },
    },
});