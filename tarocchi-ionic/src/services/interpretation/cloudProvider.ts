import type { CardData } from '../../constants/cardsData';
import { buildDailyArcanaPrompt, buildReadingPrompt, SYSTEM_INSTRUCTIONS } from './prompts';

type ChatMessage = { role: 'system' | 'user'; content: string };

async function callChatApi(messages: ChatMessage[]): Promise<string | null> {
  const url = import.meta.env.VITE_AI_API_URL as string | undefined;
  const apiKey = import.meta.env.VITE_AI_API_KEY as string | undefined;

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_AI_API_MODEL ?? 'gpt-4o-mini',
        messages,
        max_tokens: 256,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const text = data.choices?.[0]?.message?.content?.trim();
    return text && text.length > 0 ? text : null;
  } catch {
    return null;
  }
}

export async function generateCloudReading(
  card: CardData,
  position: string,
): Promise<string | null> {
  return callChatApi([
    { role: 'system', content: SYSTEM_INSTRUCTIONS },
    { role: 'user', content: buildReadingPrompt(position, card) },
  ]);
}

export async function generateCloudDaily(card: CardData): Promise<string | null> {
  return callChatApi([
    { role: 'system', content: SYSTEM_INSTRUCTIONS },
    { role: 'user', content: buildDailyArcanaPrompt(card) },
  ]);
}

export function isCloudConfigured(): boolean {
  return Boolean(import.meta.env.VITE_AI_API_URL);
}
