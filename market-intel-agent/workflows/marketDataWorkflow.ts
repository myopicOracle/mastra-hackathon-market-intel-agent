import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
import { getMarketDataTool } from "../tools/getMarketDataTool";

const getDataStep = createStep({
  id: "getData",
  description: "Fetch market data using the Polygon API tool",
  inputSchema: z.object({
    tickers: z.array(z.string()).nonempty()
  }),
  outputSchema: z.array(z.object({
    ticker: z.string(),
    data: z.any()
  })),
  execute: async ({ inputData: { tickers } }) => {
    return await getMarketDataTool.execute({ context: { tickers } });
  }
});

export const marketDataWorkflow = createWorkflow({
  id: "marketDataWorkflow",
  description: "Retrieves market data for given tickers using the Polygon API",
  inputSchema: z.object({
    tickers: z.array(z.string()).nonempty()
  }),
  outputSchema: z.array(z.object({
    ticker: z.string(),
    data: z.any()
  }))
})
  .then(getDataStep)
  .commit();