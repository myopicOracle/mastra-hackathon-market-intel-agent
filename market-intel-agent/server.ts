import { Mastra } from "@mastra/core";
import { reportAgent } from "./agents/reportAgent";
import { marketDataWorkflow } from "./workflows/marketDataWorkflow";
import { mainWorkflow } from "./workflows/mainWorkflow";

export const mastra = new Mastra({
  agents: { reportAgent },
  workflows: { marketDataWorkflow, mainWorkflow }
});