# Market Intel Agent (Mastra Template)

A streamlined **Mastra** workflow that takes one or more stock tickers, fetches **real-time market data** from the Polygon.io API, and generates an **AI-powered Markdown market brief** using OpenAI GPT.

### How It Works

```mermaid
flowchart TD
    User -->|Enter ticker(s)| mainWorkflow
    mainWorkflow --> marketDataWorkflow --> getMarketDataTool
    mainWorkflow -->|Combine outputs| reportAgent
    reportAgent -->|Markdown brief| User
```

1. **User Inputs** one or more stock tickers.
2. **`marketDataWorkflow`** fetches the latest daily market data via Polygon.io.
3. **`reportAgent`** analyzes the numbers and produces a short, clear Markdown brief.
4. **Output** is printed to the console or can be integrated into a UI.


## Installation

```bash
git clone git@github.com:<your-username>/mastra-hackathon-market-intel-agent.git
cd market-intel-agent
npm install
```


## Environment Variables

Copy `.env.example` to `.env` and add your keys:

```bash
cp .env.example .env
```

**.env.example**

```env
POLYGON_API_KEY="your-polygon-api-key"
OPENAI_API_KEY="your-openai-api-key"
```

You can get API keys from:

* Polygon.io → [https://polygon.io](https://polygon.io) (free)
* OpenAI → [https://platform.openai.com](https://platform.openai.com) ($5 min)

100% free alternative:

* Gemini → [https://ai.google.dev/gemini-api/docs/api-key](https://ai.google.dev/gemini-api/docs/api-key) (free) 
* How to make Gemini API calls with OpenAI Library → [Documentation & Code Snippets](https://ai.google.dev/gemini-api/docs/openai)


##  Usage

From the command line:

```bash
npm run dev AAPL MSFT TSLA
```

Example output:

```
## Market Brief — 2025-08-11

**AAPL**  
- Close: $227.12 (+0.74%)  
- Trend: Upward momentum past 200-day moving average.  
- Technicals: RSI approaching overbought.

**MSFT**  
- Close: $423.87 (-0.22%)  
- Trend: Holding steady after earnings.  
- Technicals: Neutral RSI, low volatility.

**TSLA**  
- Close: $815.45 (+1.14%)  
- Trend: Recovery from recent dip.  
- Technicals: Bullish MACD crossover.

---

_This report was AI-generated using OpenAI GPT and real-time Polygon data._
```


## Project Structure

```
src/
  agents/
    reportAgent.ts         # Generates the Markdown brief
  tools/
    getMarketDataTool.ts   # Fetches Polygon data
  workflows/
    mainWorkflow.ts        # Orchestrates process
    marketDataWorkflow.ts  # Calls data fetch tool
index.ts                   # CLI entrypoint
.env.example
package.json
README.md
```


## Development

To test while developing:

```bash
npm run dev AAPL
```

To change how the AI writes reports, edit the `systemPrompt` in `reportAgent.ts`.


## License

MIT
