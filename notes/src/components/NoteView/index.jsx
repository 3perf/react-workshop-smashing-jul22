import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import RandomizeSizes from "../RandomizeSizes";

const remarkPlugins = [gfm];

export default function NoteView({ text }) {
  return (
    <div className="note-view">
      <RandomizeSizes numberOfParagraphs={text.split("\n\n").length} />
      <div className="note-view__text">
        <ReactMarkdown remarkPlugins={remarkPlugins}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}
