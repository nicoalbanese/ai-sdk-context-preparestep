export type Sandbox = {
  id: string;
  readFile: (path: string) => Promise<string>;
};

export type Context = {
  sandboxId?: string;
};

