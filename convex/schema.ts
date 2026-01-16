import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    contacts: defineTable({
        name: v.string(),
        email: v.string(),
        message: v.string(),
        createdAt: v.number(),
    }),
    projects: defineTable({
        title: v.string(),
        category: v.string(),
        description: v.string(),
        image: v.string(),
        videoLoop: v.optional(v.string()),
        demoUrl: v.optional(v.string()),
        walkthroughUrl: v.optional(v.string()),
        createdAt: v.number(),
    }),
});
