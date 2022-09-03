import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  const [filter, setFilter] = useState("");

  // useLayoutEffect(() => {
  //   let widths = [];
  //   for (let i = 0; i < notesListRef.current.childNodes.length; ++i) {
  //     const noteHeader = notesListRef.current.childNodes[i].querySelector(
  //       ".notes-list__note-header"
  //     );

  //     widths.push(
  //       noteHeader.current.scrollWidth > noteHeader.current.clientWidth
  //     );
  //   }

  //   for (let i = 0; i < notesListRef.current.childNodes.length; ++i) {
  //     const noteHeader = notesListRef.current.childNodes[i].querySelector(
  //       ".notes-list__note-header"
  //     );

  //     if (widths[i]) {
  //       noteHeader.current.classList.add("notes-list__note-header_overflowing"); // ← invalidates the layout
  //     } else {
  //       noteHeader.current.classList.remove(
  //         "notes-list__note-header_overflowing"
  //       );
  //     }
  //   }

  //   // → 1 (0 extra recalcs)
  // }, [text]);

  return (
    <div className="notes-list" style={{ position: "relative" }}>
      <div className="notes-list__filter">
        <FilterInput
          filter={filter}
          onChange={setFilter}
          noteCount={Object.keys(notes).length}
        />
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
          .map(({ id, text, date }) => (
            <NoteButton
              key={id}
              id={id}
              isActive={activeNoteId === id}
              onNoteActivated={onNoteActivated}
              text={text}
              filterText={filter}
              date={date}
            />
          ))}
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
