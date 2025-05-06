import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { kampoSearch } from '../tools';

export const KampoAgent = new Agent({
  name: 'Kampo Agent',
  instructions: `
      Webを探索して現在の症状に適した漢方薬を見つけてください。
      Webで得られた情報から、漢方薬の名前と説明を提供してください。
      さらに、漢方薬の効果や副作用についても説明してください。
`,
  model: openai('gpt-4o'),
  tools: { kampoSearch },
  memory: new Memory({
    options: {
      lastMessages: 10,
      semanticRecall: false,
      threads: {
        generateTitle: false,
      },
    },
  }),
});
