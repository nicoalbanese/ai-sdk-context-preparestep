import { tool } from "ai";
import { z } from "zod";
import { Context } from "./types";
import { ERROR } from "./utils";

export const tools = {
  readFile: tool({
    description: "Read a file in the file system",
    inputSchema: z.object({
      path: z.string(),
    }),
    execute: async ({ path }, { experimental_context }) => {
      const context = experimental_context as Context;
      if (!context.sandboxId) {
        return ERROR.NO_SANDBOX;
      }
      return `File ${path} contents`;
    },
  }),
};
