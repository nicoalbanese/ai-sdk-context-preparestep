import { gateway, stepCountIs, streamText, wrapLanguageModel } from "ai";
import { devToolsMiddleware } from "@ai-sdk/devtools";
import "dotenv/config";
import { Context } from "./types";
import { tools } from "./tools";
import { createSandbox, ERROR } from "./utils";

const result = streamText({
  model: wrapLanguageModel({
    middleware: devToolsMiddleware(),
    model: gateway("anthropic/claude-haiku-4.5"),
  }),
  prompt: "Read firstfile.ts and secondfile.ts. Do it in parallel.",
  prepareStep: async ({ experimental_context, steps }) => {
    const context = experimental_context as Context;

    const lastStep = steps.at(0)?.content;
    if (
      lastStep?.some(
        (step) =>
          step.type === "tool-result" && step.output === ERROR.NO_SANDBOX,
      )
    ) {
      const sandboxId = await createSandbox();
      context.sandboxId = sandboxId;
    }
    return undefined;
  },
  experimental_context: {} as Context,
  tools,
  stopWhen: stepCountIs(5),
});

result.consumeStream();
