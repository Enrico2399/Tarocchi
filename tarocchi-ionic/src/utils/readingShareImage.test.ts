import { describe, expect, it, beforeEach, vi } from 'vitest';
import { cards } from '../constants/cardsData';
import { renderReadingCardCanvas, shareReadingAsImage } from './readingShareImage';

function mockCanvasContext(): CanvasRenderingContext2D {
  return {
    measureText: (text: string) => ({ width: text.length * 8 }),
    createLinearGradient: () => ({ addColorStop: vi.fn() }),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
    font: '',
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    textAlign: 'left',
  } as unknown as CanvasRenderingContext2D;
}

describe('readingShareImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockCanvasContext());
    HTMLCanvasElement.prototype.toBlob = function toBlob(callback) {
      callback(new Blob(['png'], { type: 'image/png' }));
    };
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:mock'),
      revokeObjectURL: vi.fn(),
    });
  });

  it('renders canvas with expected dimensions', () => {
    const canvas = renderReadingCardCanvas({
      cards: cards.slice(0, 1),
      descriptions: ['Un messaggio chiaro per te.'],
      positions: ['Messaggio'],
      locale: 'it',
      intention: 'Amore',
    });

    expect(canvas.width).toBe(1080);
    expect(canvas.height).toBeGreaterThan(400);
  });

  it('downloads image when share API unavailable', async () => {
    const click = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        return { click, href: '', download: '' } as unknown as HTMLAnchorElement;
      }
      return originalCreateElement(tag);
    });

    const result = await shareReadingAsImage({
      cards: cards.slice(0, 1),
      descriptions: ['Test'],
      positions: ['Msg'],
      locale: 'it',
    });

    expect(result).toBe('downloaded');
    expect(click).toHaveBeenCalled();
  });
});
