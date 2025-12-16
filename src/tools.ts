import { tool } from "ai";
import { z } from "zod";
import { Context } from "./types";

export const tools = {
  readFile: tool({
    description: "Read a file in the file system",
    inputSchema: z.object({
      path: z.string(),
    }),
    execute: async ({ path }, { experimental_context }) => {
      const context = experimental_context as Context;
      const sandbox = await context.getSandbox();
      return sandbox.readFile(path);
    },
  }),
};
