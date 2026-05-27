import { useEffect, useState } from 'react';

const RAINBOW_COLORS = [
  'rgb(0, 191, 255)',
  'rgb(0, 255, 255)',
  'rgb(173, 216, 230)',
  'rgb(255, 255, 0)',
  'rgb(255, 215, 0)',
  'rgb(255, 165, 0)',
];

export function useRainbowColor(active: boolean): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % RAINBOW_COLORS.length);
    }, 200);
    return () => clearInterval(id);
  }, [active]);

  return RAINBOW_COLORS[index];
}
