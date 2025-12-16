import { tool } from "ai";
import { z } from "zod";
import { Context } from "./types";
import { getOrCreateSandboxId, getSandbox } from "./utils";

export const tools = {
  readFile: tool({
    description: "Read a file in the file system",
    inputSchema: z.object({
      path: z.string(),
    }),
    execute: async ({ path }, { experimental_context }) => {
      const context = experimental_context as Context;
      const sandboxId = await getOrCreateSandboxId(context);
      const sandbox = getSandbox(sandboxId);
      return sandbox.readFile(path);
    },
  }),
};
