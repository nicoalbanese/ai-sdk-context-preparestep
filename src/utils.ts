import { generateId } from "ai";
import { Context, Sandbox } from "./types";

const createSandbox = async (): Promise<Sandbox> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const id = generateId();
  return {
    id,
    readFile: async (path: string) => {
      return `Contents of ${path} in Sandbox: ${id}`;
    },
  };
};

export const createContext = (): Context => {
  let sandboxPromise: Promise<Sandbox> | null = null;

  return {
    getSandbox: async () => {
      if (!sandboxPromise) {
        sandboxPromise = (async () => {
          try {
            return await createSandbox();
          } catch (err) {
            sandboxPromise = null;
            throw err;
          }
        })();
      }
      return sandboxPromise;
    },
  };
};
