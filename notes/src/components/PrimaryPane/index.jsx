import { Button } from "@mui/material";
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import fakeApi from "../../utils/fakeApi";
import NoteEditor from "../NoteEditor";
import NoteView from "../NoteView";
import DarkModeSwitcher from "../DarkModeSwitcher";
import ActiveAuthors from "../ActiveAuthors";
import spinner from "./spinner.svg";
import "./index.css";

function PrimaryPane({ activeNoteId, notes, saveNote }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [publishedAt, setPublishedAt] = useState(null);

  // const [componentState, setComponentState] = useState({
  //   isLoading: false,
  //   isPublic: false,
  //   publishedAt: null,
  //   foo: 123,
  // });

  // update batching
  // React 17

  const togglePublic = async () => {
    setIsLoading(true); // → 1 (batch)
    setPublishedAt(null); // → 1 (batch)

    if (isPublic /* == false */) {
      await fakeApi.setPublicStatus(false);
      setIsPublic(false);
      setIsLoading(false); // → 2 (batch)
    } else {
      await fakeApi.setPublicStatus(true);
      const publishedDate = await fakeApi.getPublishedDate();

      // unstable_batchedUpdates(() => {
      setIsPublic(true); // → 2 (batch)
      setPublishedAt(publishedDate.toLocaleTimeString()); // → 2 (batch)
      setIsLoading(false); // → 2 (batch)

      // });
    }
  };

  // togglePublic (part 1)
  // togglePublic (part 2)
  // togglePublic (part 3)

  /*
  React 17−:

  batchUpdates = false;

  unstable_batchedUpdates = (cb) => {
    batchUpdates = true;
    cb();
    batchUpdates = false;
    processUpdateQueue();
  }

  setState = (state) => {
    updateQueue.push(state);
    if (!batchUpdates) {
      processUpdateQueue();
    }
  }

  onClick = (cb) => {
    unstable_batchedUpdates(() => {
      cb()
    });
  }

  React 18:

  NO batchUpdates;

  unstable_batchedUpdates = (cb) => cb();

  setState = (state) => {
    updateQueue.push(state);
    // ↓ Actually a different API in development (and maybe in production?)
    // - postMessage(() => { ... })

    if (!wasProcessingScheduled) {
      wasProcessingScheduled = true
      Promise.resolve().then(() => {
        processUpdateQueue();
      })
    }
  }

  onClick = (cb) => cb();
  */

  // React 17− → 4
  // React 18 → 2

  // 1) use a single state object (with useReducer or useState)
  // setComponentState({
  //      // ...componentState,
  //       isPublic: true,
  //       publishedAt: publishedDate,
  //      isLoading: false,
  //    });

  // 2) use an updater function (maybe?)
  // 3) unstable_batchedUpdates

  if (!activeNoteId) {
    return (
      <div className="primary-pane__empty-editor">
        <div className="primary-pane__eyes">👀</div>
        <div className="primary-pane__eyes-caption">
          Select a note to start editing
        </div>
      </div>
    );
  }

  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1 className="primary-pane__header-text">Editor</h1>
        <ActiveAuthors />
        <DarkModeSwitcher />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__controls">
          <Button
            variant="outlined"
            onClick={togglePublic}
            disabled={isLoading}
            startIcon={isPublic ? "🤫" : "👀"}
          >
            {isLoading
              ? "Loading..."
              : isPublic
              ? "Make Private"
              : "Make Public"}
          </Button>
          {!isLoading && isPublic && <span>Published at: {publishedAt}</span>}
        </div>
        <NoteEditor
          saveNote={({ text, date }) => saveNote(activeNoteId, { text, date })}
          notes={notes}
          activeNoteId={activeNoteId}
        />
        <div className="primary-pane__view">
          <NoteView text={notes[activeNoteId].text} />
        </div>
      </div>
      <div
        className={
          "primary-pane__spinner-wrapper" +
          (isLoading ? " primary-pane__spinner-wrapper_visible" : "")
        }
      >
        <img className="primary-pane__spinner" src={spinner} alt="" />
      </div>
    </div>
  );
}

export default PrimaryPane;
