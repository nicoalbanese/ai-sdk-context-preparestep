import { generateId } from "ai";

export const createSandbox = async (): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return generateId();
};

export const ERROR = {
  NO_SANDBOX:
    "Sandbox not yet instantiated. It will be initiated now, please call the tool again.",
};
