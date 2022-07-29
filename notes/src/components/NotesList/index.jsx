import { useState, memo } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";
import { useMemo } from "react";
import { useCallback } from "react";

// const FilterInputMemo = memo(FilterInput);

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  const [filter, setFilter] = useState("");

  const meaningOfLife = useMemo(() => {
    // Do 5 seconds of computations...

    return 42;
  }, []);

  return (
    <div className="notes-list" style={{ position: "relative" }}>
      <div className="notes-list__filter">
        {useMemo(
          () => (
            <FilterInput
              filter={filter}
              onChange={setFilter}
              noteCount={Object.keys(notes).length}
            />
            // === previous version
          ),
          [filter, setFilter, Object.keys(notes).length]
        )}
      </div>

      <div className="notes-list__notes">
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!filter) {
              return true;
            }

            return text.toLowerCase().includes(filter.toLowerCase());
          })
          .map(({ id, text, date }) => {
            // const cb = useCallback(
            //   () => onNoteActivated(id),
            //   [onNoteActivated, id]
            // );

            return (
              <NoteButton
                key={id}
                id={id}
                isActive={activeNoteId === id}
                onNoteActivated={onNoteActivated}
                text={text}
                filterText={filter}
                date={date}
              />
            );
          })}
      </div>

      <div className="notes-list__controls">
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 1 })}
          >
            + Note
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 300 })}
          >
            + Huge
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 100, paragraphs: 1 })}
          >
            + 100
          </Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onDeleteAllRequested()}
          >
            Delete all
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NotesList;
