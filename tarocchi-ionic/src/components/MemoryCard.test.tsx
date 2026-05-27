import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MemoryCard from './MemoryCard';

vi.mock('../utils/audio', () => ({
  playFlipSound: vi.fn(),
}));

vi.mock('../utils/haptics', () => ({
  triggerFlipHaptic: vi.fn(),
}));

describe('MemoryCard', () => {
  const props = {
    title: 'Situazione Attuale',
    cardName: 'Il Matto',
    description: 'Descrizione test',
    image: '/assets/images/Folle0.jpeg',
  };

  it('starts showing card back', () => {
    render(<MemoryCard {...props} />);
    expect(screen.getByTestId('memory-card')).toHaveAttribute('data-flipped', 'true');
    expect(screen.getByText('Situazione Attuale')).toBeInTheDocument();
  });

  it('flips to front on click', () => {
    render(<MemoryCard {...props} />);
    fireEvent.click(screen.getByTestId('memory-card'));
    expect(screen.getByTestId('memory-card')).toHaveAttribute('data-flipped', 'false');
    expect(screen.getByText('Il Matto')).toBeInTheDocument();
    expect(screen.getByText('Descrizione test')).toBeInTheDocument();
  });
});
