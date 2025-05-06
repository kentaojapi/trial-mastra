import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { tavily } from "@tavily/core";

/**
 * 症状を受け取り、その症状に合ったおすすめの漢方薬を
 * Tavily Search API で検索して返すツール。
 */
export const kampoSearch = createTool({
  id: "Kampo Recommendation Search",
  inputSchema: z.object({
    symptoms: z.string(),
  }),
  description: `
    受け取った症状（日本語テキスト）をもとに
    「<症状> おすすめの漢方」というクエリで
    Tavily Search API を呼び出し、
    上位の検索結果を返します
  `,
  execute: async ({ context: { symptoms } }) => {
    const client = tavily({
      apiKey: process.env.TAVILY_API_KEY!,
    });

    const query = `${symptoms} おすすめの漢方`;

    const response = await client.search(query, { options: null });

    const recommendations = response.results.slice(0, 3).map((r: any) => ({
      title: r.title,
      url: r.url,
      content: r.content,
    }));

    return { recommendations };
  },
});