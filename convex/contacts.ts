import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
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
        await ctx.db.insert("contacts", {
            name: args.name,
            email: args.email,
            message: args.message,
            createdAt: Date.now(),
        });
    },
});
