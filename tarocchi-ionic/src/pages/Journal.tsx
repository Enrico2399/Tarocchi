import { useCallback, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { getSpreadById } from '../constants/readingSpreads';
import { useTranslation } from '../i18n/useTranslation';
import {
  deleteReadingEntry,
  getReadingHistory,
  updateReadingNote,
  type SavedReadingEntry,
} from '../utils/readingHistory';
import './Journal.css';

const Journal: React.FC = () => {
  const { locale, t } = useTranslation();
  const [entries, setEntries] = useState<SavedReadingEntry[]>(() => getReadingHistory());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});

  const refresh = useCallback(() => {
    setEntries(getReadingHistory());
  }, []);

  const handleNoteChange = (id: string, value: string) => {
    setDraftNotes((prev) => ({ ...prev, [id]: value }));
  };

  const saveNote = (id: string) => {
    const note = draftNotes[id] ?? entries.find((e) => e.id === id)?.note ?? '';
    updateReadingNote(id, note);
    refresh();
  };

  const removeEntry = (id: string) => {
    deleteReadingEntry(id);
    if (expandedId === id) {
      setExpandedId(null);
    }
    refresh();
  };

  return (
    <IonPage className="journal-page">
      <IonHeader>
        <IonToolbar className="journal-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text={t.back} />
          </IonButtons>
          <IonTitle>{t.journalTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="journal-content ion-padding">
        {entries.length === 0 ? (
          <p className="journal-empty" data-testid="journal-empty">
            {t.journalEmpty}
          </p>
        ) : (
          <ul className="journal-list">
            {entries.map((entry) => {
              const spread = getSpreadById(entry.spreadId, locale);
              const isExpanded = expandedId === entry.id;
              const noteValue = draftNotes[entry.id] ?? entry.note ?? '';

              return (
                <li key={entry.id} className="journal-item" data-testid="journal-entry">
                  <button
                    type="button"
                    className="journal-item__header"
                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                    aria-expanded={isExpanded}
                  >
                    <time dateTime={entry.createdAt}>
                      {new Date(entry.createdAt).toLocaleString(locale === 'en' ? 'en-GB' : 'it-IT')}
                    </time>
                    <span className="journal-item__spread">{spread.name}</span>
                    <span className="journal-item__cards">
                      {entry.lines.map((line) => line.cardName).join(' · ')}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="journal-item__body">
                      {entry.intention && (
                        <p className="journal-item__intention">
                          <strong>{t.intentionLabel}:</strong> {entry.intention}
                        </p>
                      )}
                      <ul className="journal-item__lines">
                        {entry.lines.map((line, index) => (
                          <li key={`${entry.id}-${index}`}>
                            <span className="journal-item__position">{line.position}</span>
                            <span className="journal-item__card">{line.cardName}</span>
                            <p>{line.description}</p>
                          </li>
                        ))}
                      </ul>
                      <label className="journal-item__note-label" htmlFor={`note-${entry.id}`}>
                        {t.journalNoteLabel}
                      </label>
                      <textarea
                        id={`note-${entry.id}`}
                        className="journal-item__note"
                        value={noteValue}
                        onChange={(e) => handleNoteChange(entry.id, e.target.value)}
                        onBlur={() => saveNote(entry.id)}
                        placeholder={t.journalNotePlaceholder}
                        rows={3}
                        maxLength={500}
                        data-testid="journal-note"
                      />
                      <button
                        type="button"
                        className="journal-item__delete"
                        onClick={() => removeEntry(entry.id)}
                        data-testid="journal-delete"
                      >
                        {t.journalDelete}
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Journal;
