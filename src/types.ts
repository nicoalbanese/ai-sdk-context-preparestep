export type Sandbox = {
  id: string;
  readFile: (path: string) => Promise<string>;
};

export type Context = {
  getSandbox: () => Promise<Sandbox>;
};

