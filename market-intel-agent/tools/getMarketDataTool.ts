import { createTool } from "@mastra/core/tools";
import fetch from "node-fetch";
import { z } from "zod";

export const getMarketDataTool = createTool({
  id: "getMarketDataTool",
  description: "Fetches real-time market data for one or more stock tickers from the Polygon.io API",
  inputSchema: z.object({
    tickers: z.array(z.string()).nonempty("At least one ticker is required")
  }),
  outputSchema: z.array(z.object({
    ticker: z.string(),
    data: z.any()
  })),
  execute: async ({ context: { tickers } }) => {
    const apiKey = process.env.POLYGON_API_KEY;
    if (!apiKey) {
      throw new Error("Missing POLYGON_API_KEY in environment variables");
    }
    
    const results = [];
    
    for (const ticker of tickers) {
      const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${apiKey}`;
      
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Polygon API request failed for ${ticker}: ${res.statusText}`);
      }
      
      const data = await res.json();
      results.push({ ticker, data });
    }
    
    return results;
  }
});