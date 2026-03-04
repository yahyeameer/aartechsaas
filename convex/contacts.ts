import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return []; // Return empty instead of throwing to avoid crashing the UI if not signed in
        }
        return await ctx.db.query("contacts").order("desc").collect();
    },
});

export const createContact = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        if (args.message.length < 10) {
            throw new Error("Message is too short.");
        }

        await ctx.db.insert("contacts", {
            name: args.name,
            email: args.email,
            message: args.message,
            createdAt: Date.now(),
        });
    },
});
