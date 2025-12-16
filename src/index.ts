import { gateway, stepCountIs, streamText, wrapLanguageModel } from "ai";
import { devToolsMiddleware } from "@ai-sdk/devtools";
import "dotenv/config";
import { tools } from "./tools";
import { createContext } from "./utils";

const result = streamText({
  model: wrapLanguageModel({
    middleware: devToolsMiddleware(),
    model: gateway("anthropic/claude-haiku-4.5"),
  }),
  prompt:
    "Read firstfile.ts and secondfile.ts in parallel. Afterwards, get thirdfile.ts",
  experimental_context: createContext(),
  tools,
  stopWhen: stepCountIs(5),
});

result.consumeStream();
