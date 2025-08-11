import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const reportAgent = new Agent({
  name: "reportAgent",
  instructions: `You are a financial analyst. When given market data, create a clear, concise Markdown report.

Include:
- Summary of key movements
- Notable trends  
- Use proper Markdown formatting

Always respond with well-formatted Markdown content.`,
  model: openai("gpt-4o-mini")
});