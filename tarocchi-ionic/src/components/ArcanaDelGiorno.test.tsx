import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { LocaleProvider } from '../i18n/LocaleProvider';
import ArcanaDelGiorno from './ArcanaDelGiorno';

vi.mock('@ionic/react', async () => {
  const React = await import('react');
  return {
    IonModal: ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) =>
      isOpen ? <div data-testid="arcana-modal">{children}</div> : null,
    IonContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

function renderArcana() {
  return render(
    <LocaleProvider>
      <ArcanaDelGiorno />
    </LocaleProvider>,
  );
}

describe('ArcanaDelGiorno', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows notification dot when not viewed today', () => {
    renderArcana();
    expect(screen.getByTestId('arcana-dot')).toBeInTheDocument();
  });

  it('opens modal and hides dot after click', () => {
    renderArcana();
    fireEvent.click(screen.getByTestId('arcana-btn'));
    expect(screen.getByTestId('arcana-modal')).toBeInTheDocument();
    expect(screen.getByTestId('arcana-modal-title')).toBeInTheDocument();
    expect(screen.queryByTestId('arcana-dot')).not.toBeInTheDocument();
  });

  it('does not show dot if already viewed today', () => {
    localStorage.setItem('lastArcanaView', new Date().toDateString());
    renderArcana();
    expect(screen.queryByTestId('arcana-dot')).not.toBeInTheDocument();
  });
});
