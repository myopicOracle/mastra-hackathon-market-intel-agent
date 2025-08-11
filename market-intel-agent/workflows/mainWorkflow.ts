import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
import { marketDataWorkflow } from "./marketDataWorkflow";
import { reportAgent } from "../agents/reportAgent";

const fetchMarketDataStep = createStep({
  id: "fetchMarketData",
  description: "Fetch market data using the market data workflow",
  inputSchema: z.object({
    tickers: z.array(z.string()).nonempty()
  }),
  outputSchema: z.array(z.object({
    ticker: z.string(),
    data: z.any()
  })),
  execute: async ({ inputData: { tickers }, mastra }) => {
    const run = await mastra.getWorkflow("marketDataWorkflow").createRunAsync();
    const result = await run.start({ inputData: { tickers } });
    
    if (result.status === 'success') {
      return result.result;
    } else {
      throw new Error(`Market data workflow failed: ${result.error || 'Unknown error'}`);
    }
  }
});

const generateReportStep = createStep({
  id: "generateReport", 
  description: "Generate a market report using the report agent",
  inputSchema: z.array(z.object({
    ticker: z.string(),
    data: z.any()
  })),
  outputSchema: z.string(),
  execute: async ({ inputData: marketData }) => {
    const response = await reportAgent.generate([
      {
        role: "user",
        content: `Generate a market report for this data: ${JSON.stringify(marketData, null, 2)}`
      }
    ]);
    
    return response.text;
  }
});

export const mainWorkflow = createWorkflow({
  id: "mainWorkflow",
  description: "Coordinates the market data retrieval and report generation process",
  inputSchema: z.object({
    tickers: z.array(z.string()).nonempty()
  }),
  outputSchema: z.string()
})
  .then(fetchMarketDataStep)
  .then(generateReportStep)
  .commit();