import { generateId } from "ai";
import { Context, Sandbox } from "./types";

export const createSandbox = async (): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return generateId();
};

export const getSandbox = (id: string): Sandbox => {
  return {
    id,
    readFile: async (path: string) => {
      return `Contents of ${path} in Sandbox: ${id}`;
    },
  };
};

let sandboxPromise: Promise<string> | null = null;

export const getOrCreateSandboxId = async (context: Context): Promise<string> => {
  if (context.sandboxId) {
    return context.sandboxId;
  }

  if (!sandboxPromise) {
    sandboxPromise = (async () => {
      try {
        const id = await createSandbox();
        return id;
      } catch (err) {
        sandboxPromise = null;
        throw err;
      }
    })();
  }

  const sandboxId = await sandboxPromise;
  context.sandboxId = sandboxId;
  return sandboxId;
};
