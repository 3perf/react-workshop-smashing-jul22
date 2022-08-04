import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const remarkPlugins = [gfm];

export default function NoteView({ text }) {
  return (
    <div className="note-view">
      <ReactMarkdown remarkPlugins={remarkPlugins}>{text}</ReactMarkdown>
    </div>
  );
}

// → debouncing
// → server rendering
// → replace completely with wysiwyg
// → move to web worker/wasm
//    → copying data is not free
// → virtualisation
// → split like react 18 concurrent mode (with isInputPending() API)
