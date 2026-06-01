import type { CardData } from '../constants/cardsData';
import type { Locale } from '../i18n/localeStorage';
import { getTranslations } from '../i18n/getTranslations';
import { buildReadingLines } from './shareReading';

export type ReadingImageOptions = {
  cards: CardData[];
  descriptions: string[];
  positions: string[];
  locale?: Locale;
  intention?: string;
};

const CARD_WIDTH = 1080;
const PADDING = 48;
const LINE_HEIGHT = 28;

function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  return `${text.slice(0, maxChars - 1).trim()}…`;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.length > 0 ? lines : [''];
}

function estimateHeight(
  ctx: CanvasRenderingContext2D,
  options: ReadingImageOptions,
): number {
  const t = getTranslations(options.locale);
  const lines = buildReadingLines(
    options.cards,
    options.descriptions,
    options.positions,
    options.locale,
  );
  const contentWidth = CARD_WIDTH - PADDING * 2;
  let height = PADDING + 60;

  if (options.intention?.trim()) {
    ctx.font = '24px Georgia, serif';
    height += wrapText(ctx, options.intention.trim(), contentWidth).length * LINE_HEIGHT + 24;
  }

  height += 40;

  for (const line of lines) {
    height += 36;
    ctx.font = 'bold 26px Georgia, serif';
    height += 32;
    ctx.font = '22px Georgia, serif';
    const descLines = wrapText(ctx, truncateText(line.description, 220), contentWidth);
    height += descLines.length * LINE_HEIGHT + 28;
  }

  height += PADDING + 40;
  height += 32;
  ctx.font = '18px Georgia, serif';
  height += wrapText(ctx, t.shareImageFooter, contentWidth).length * 22;

  return Math.max(height, 720);
}

export function renderReadingCardCanvas(options: ReadingImageOptions): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas not supported');
  }

  const t = getTranslations(options.locale);
  canvas.height = estimateHeight(ctx, options);
  const contentWidth = CARD_WIDTH - PADDING * 2;

  const gradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, canvas.height);
  gradient.addColorStop(0, '#1a0a2e');
  gradient.addColorStop(0.5, '#2d1b4e');
  gradient.addColorStop(1, '#120820');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CARD_WIDTH, canvas.height);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, CARD_WIDTH - 40, canvas.height - 40);

  let y = PADDING + 36;
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 42px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(t.shareImageTitle, CARD_WIDTH / 2, y);
  y += 48;

  if (options.intention?.trim()) {
    ctx.fillStyle = '#c4b5fd';
    ctx.font = 'italic 24px Georgia, serif';
    ctx.textAlign = 'left';
    const intentionLines = wrapText(ctx, `"${options.intention.trim()}"`, contentWidth);
    for (const line of intentionLines) {
      ctx.fillText(line, PADDING, y);
      y += LINE_HEIGHT;
    }
    y += 16;
  }

  const readingLines = buildReadingLines(
    options.cards,
    options.descriptions,
    options.positions,
    options.locale,
  );

  ctx.textAlign = 'left';
  for (const line of readingLines) {
    ctx.fillStyle = '#a78bfa';
    ctx.font = 'bold 22px Georgia, serif';
    ctx.fillText(line.position.toUpperCase(), PADDING, y);
    y += 30;

    ctx.fillStyle = '#f3e8ff';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText(line.cardName, PADDING, y);
    y += 36;

    ctx.fillStyle = '#e9d5ff';
    ctx.font = '22px Georgia, serif';
    const descLines = wrapText(ctx, truncateText(line.description, 220), contentWidth);
    for (const descLine of descLines) {
      ctx.fillText(descLine, PADDING, y);
      y += LINE_HEIGHT;
    }
    y += 24;
  }

  ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
  ctx.font = '18px Georgia, serif';
  ctx.textAlign = 'center';
  const footerLines = wrapText(ctx, t.shareImageFooter, contentWidth);
  let footerY = canvas.height - PADDING - footerLines.length * 22;
  for (const footerLine of footerLines) {
    ctx.fillText(footerLine, CARD_WIDTH / 2, footerY);
    footerY += 22;
  }

  return canvas;
}

export async function renderReadingCardBlob(options: ReadingImageOptions): Promise<Blob> {
  const canvas = renderReadingCardCanvas(options);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create image'));
      }
    }, 'image/png');
  });
}

export async function shareReadingAsImage(options: ReadingImageOptions): Promise<'shared' | 'downloaded'> {
  const blob = await renderReadingCardBlob(options);
  const file = new File([blob], 'tarocchi-lettura.png', { type: 'image/png' });
  const t = getTranslations(options.locale);

  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: t.shareTitle,
      files: [file],
    });
    return 'shared';
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'tarocchi-lettura.png';
  anchor.click();
  URL.revokeObjectURL(url);
  return 'downloaded';
}
