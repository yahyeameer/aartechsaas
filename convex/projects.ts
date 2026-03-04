import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("projects").order("desc").collect();
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        category: v.string(),
        description: v.string(),
        image: v.string(),
        videoLoop: v.optional(v.string()),
        demoUrl: v.optional(v.string()),
        walkthroughUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated. Please sign in.");
        }

        await ctx.db.insert("projects", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

export const remove = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated. Please sign in.");
        }

        await ctx.db.delete(args.id);
    },
});
