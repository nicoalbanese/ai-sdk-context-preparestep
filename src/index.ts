import { gateway, stepCountIs, streamText, wrapLanguageModel } from "ai";
import { devToolsMiddleware } from "@ai-sdk/devtools";
import "dotenv/config";
import { Context } from "./types";
import { tools } from "./tools";

const result = streamText({
  model: wrapLanguageModel({
    middleware: devToolsMiddleware(),
    model: gateway("anthropic/claude-haiku-4.5"),
  }),
  prompt: "Read firstfile.ts and secondfile.ts in parallel. Afterwards, get thirdfile.ts",
  experimental_context: {} as Context,
  tools,
  stopWhen: stepCountIs(5),
});

result.consumeStream();
