export default {
    providers: [
        {
            domain: `https://${process.env.CLERK_ISSUER_URL || "awaited-labrador-32.clerk.accounts.dev"}`,
            applicationID: "convex",
        },
    ],
};
