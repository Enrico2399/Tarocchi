import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MemoryCard from './MemoryCard';

vi.mock('../utils/audio', () => ({
  playFlipSound: vi.fn(),
}));

vi.mock('../utils/haptics', () => ({
  triggerFlipHaptic: vi.fn(),
}));

vi.mock('@ionic/react', async () => {
  const React = await import('react');
  return {
    IonModal: ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) =>
      isOpen ? <div data-testid="card-text-modal">{children}</div> : null,
    IonContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('MemoryCard', () => {
  const props = {
    title: 'Situazione Attuale',
    cardName: 'Il Matto',
    description: 'Descrizione test',
    image: '/assets/images/Folle0.jpeg',
  };

  const longText = 'Un messaggio lungo dell\'oracolo. '.repeat(8);

  it('starts showing card back', () => {
    render(<MemoryCard {...props} description={longText} />);
    expect(screen.getByTestId('memory-card')).toHaveAttribute('data-flipped', 'true');
    expect(screen.getByTestId('memory-card')).toHaveAttribute('data-revealed', 'false');
    expect(screen.queryByTestId('read-more-btn')).not.toBeInTheDocument();
    expect(screen.getByText('Situazione Attuale')).toBeInTheDocument();
  });

  it('flips to front on click', () => {
    render(<MemoryCard {...props} />);
    fireEvent.click(screen.getByLabelText('Gira carta Situazione Attuale'));
    expect(screen.getByTestId('memory-card')).toHaveAttribute('data-flipped', 'false');
    expect(screen.getByTestId('memory-card')).toHaveAttribute('data-revealed', 'true');
    expect(screen.getByText('Il Matto')).toBeInTheDocument();
    expect(screen.getByText('Descrizione test')).toBeInTheDocument();
  });

  it('shows read more only after flip with long descriptions', () => {
    render(<MemoryCard {...props} description={longText} readMoreLabel="Leggi tutto" />);
    expect(screen.queryByTestId('read-more-btn')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Gira carta Situazione Attuale'));
    const readMore = screen.getByTestId('read-more-btn');
    expect(readMore).toBeInTheDocument();
    fireEvent.click(readMore);
    expect(screen.getByTestId('card-text-modal')).toBeInTheDocument();
    expect(screen.getByTestId('card-full-description')).toHaveTextContent(longText.trim());
  });

  it('hides read more when flipped back to cover', () => {
    render(<MemoryCard {...props} description={longText} readMoreLabel="Leggi tutto" />);
    fireEvent.click(screen.getByLabelText('Gira carta Situazione Attuale'));
    expect(screen.getByTestId('read-more-btn')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Gira carta Situazione Attuale'));
    expect(screen.getByTestId('memory-card')).toHaveAttribute('data-flipped', 'true');
    expect(screen.queryByTestId('read-more-btn')).not.toBeInTheDocument();
  });
});
